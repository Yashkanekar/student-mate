import { useState, useEffect, useRef } from "react";
import styles from "./DocumentProcessor.module.css";
import { processDocument } from "../../../services/documentService";

const DocumentProcessor = ({
  onProcessComplete,
  buttonText = "Generate Summary & MCQs",
  acceptedFileTypes = [".pdf", ".doc", ".docx"],
  showPreview = false,
}) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const abortRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileExtension =
      "." + selectedFile.name.split(".").pop().toLowerCase();
    if (!acceptedFileTypes.includes(fileExtension)) {
      setError(
        `Please upload a valid file. Accepted types: ${acceptedFileTypes.join(
          ", "
        )}`
      );
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setFile(selectedFile);
    setError(null);

    if (
      showPreview &&
      (fileExtension === ".ppt" || fileExtension === ".pptx")
    ) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await processDocument(file, controller.signal);

      onProcessComplete({
        summary: data.summary,
        mcqs: data.mcqs || [],
        fileName: file.name,
        fileData: data.fileData,
        mimeType: data.mimeType,
      });

      if (!showPreview) {
        setFile(null);
      }
    } catch (err) {
      if (err.name === "CanceledError" || err.message === "canceled") {
        console.log("Document upload cancelled");
      } else {
        console.error("Error processing document:", err);
        setError(
          err.response?.data?.error ||
            "Failed to process document. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.uploadSection}>
          <input
            className={styles.fileInput}
            type="file"
            accept={acceptedFileTypes.join(",")}
            onChange={handleFileChange}
            disabled={loading}
          />
          <button
            className={styles.submitButton}
            type="submit"
            disabled={!file || loading}
          >
            {loading ? "Processing..." : buttonText}
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>

      {showPreview && previewUrl && (
        <div className={styles.filePreview}>
          <h4>Preview:</h4>
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              previewUrl
            )}`}
            width="100%"
            height="500px"
            frameBorder="0"
            title="PowerPoint Preview"
          />
        </div>
      )}
    </div>
  );
};

export default DocumentProcessor;
