const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const OpenAI = require("openai");
const path = require("path");
require("dotenv").config();

const PptxParser = require("node-pptx-parser").default;
const fs = require("fs").promises;
const os = require("os");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function extractPdfText(buffer) {
  const data = await pdfParse(buffer);
  return data.text;
}

async function extractDocText(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function extractPptxText(buffer) {
  try {
    const tempFilePath = path.join(os.tmpdir(), `temp-${Date.now()}.pptx`);
    await fs.writeFile(tempFilePath, buffer);

    const parser = new PptxParser(tempFilePath);
    const textContent = await parser.extractText();

    await fs.unlink(tempFilePath);

    const allText = textContent
      .map((slide, index) => {
        return `Slide ${index + 1}:\n${slide.text.join("\n")}`;
      })
      .join("\n\n");

    return allText;
  } catch (error) {
    console.error("Error parsing PPTX:", error);
    throw new Error("Failed to parse PowerPoint file");
  }
}

async function generateSummary(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that creates concise summaries.",
      },
      {
        role: "user",
        content: `Summarize this document:\n\n${text.substring(0, 4000)}`,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });
  return response.choices[0].message.content;
}

async function generateMCQs(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an expert at creating multiple choice questions. Return only valid JSON.",
      },
      {
        role: "user",
        content: `Generate 5 MCQs from this text. Return as JSON: [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}]\n\n${text.substring(
          0,
          4000
        )}`,
      },
    ],
    temperature: 0.8,
  });

  const content = response.choices[0].message.content;
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
}

app.post("/api/process-document", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let extractedText = "";
    const fileType = req.file.mimetype;

    if (fileType === "application/pdf") {
      extractedText = await extractPdfText(req.file.buffer);
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await extractDocText(req.file.buffer);
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const [summary, mcqs] = await Promise.all([
      generateSummary(extractedText),
      generateMCQs(extractedText),
    ]);

    res.json({ summary, mcqs });
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).json({ error: "Failed to process document" });
  }
});

app.post(
  "/api/process-presentation",
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileType = req.file.mimetype;

      if (
        fileType !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        fileType !== "application/vnd.ms-powerpoint"
      ) {
        return res
          .status(400)
          .json({ error: "Please upload a PowerPoint file (.ppt or .pptx)" });
      }

      const extractedText = await extractPptxText(req.file.buffer);

      const [summary, mcqs] = await Promise.all([
        generateSummary(extractedText),
        generateMCQs(extractedText),
      ]);

      const fileBase64 = req.file.buffer.toString("base64");

      res.json({
        summary,
        mcqs,
        fileData: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
      });
    } catch (error) {
      console.error("Error processing presentation:", error);
      res.status(500).json({ error: "Failed to process presentation" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
