import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentProcessor from "../../components/common/DocumentProcessor/DocumentProcessor";
import { setInClassDocument } from "../../features/class/classSlice";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import styles from "./TrainingPage.module.css";

const TrainingPage = () => {
  const dispatch = useDispatch();
  const { inClassSummary, inClassMcqs } = useSelector((state) => state.class);
  const [documents, setDocuments] = useState([]);

  const handlePresentationProcessed = (data) => {
    dispatch(
      setInClassDocument({
        summary: data.summary,
        mcqs: data.mcqs || [],
        fileName: data.fileName,
      })
    );

    const blob = new Blob(
      [Uint8Array.from(atob(data.fileData), (c) => c.charCodeAt(0))],
      { type: data.mimeType }
    );
    const fileUrl = URL.createObjectURL(blob);

    setDocuments([
      {
        uri: fileUrl,
        fileName: data.fileName,
        fileType: data.fileName.split(".").pop(),
      },
    ]);
  };

  useEffect(() => {
    return () => {
      documents.forEach((doc) => URL.revokeObjectURL(doc.uri));
    };
  }, [documents]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>In-Class Material</h2>
      <p className={styles.instructions}>Upload your lecture presentation</p>

      <DocumentProcessor
        onProcessComplete={handlePresentationProcessed}
        buttonText="Upload Lecture Presentation"
        acceptedFileTypes={[".ppt", ".pptx"]}
        apiEndpoint="/api/process-presentation"
        showPreview={false}
      />

      {documents.length > 0 && (
        <div className={styles.presentationViewer}>
          <h3 className={styles.sectionTitle}>Presentation Preview</h3>
          <DocViewer
            documents={documents}
            pluginRenderers={DocViewerRenderers}
            config={{
              header: {
                disableHeader: false,
                disableFileName: false,
                retainURLParams: false,
              },
            }}
          />
        </div>
      )}

      {inClassSummary && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Lecture Summary</h3>
          <p>{inClassSummary}</p>
        </div>
      )}

      {inClassMcqs && inClassMcqs.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Practice Questions</h3>
          {inClassMcqs.map((mcq, index) => (
            <div key={index} className={styles.mcqItem}>
              <h4 className={styles.mcqQuestion}>
                Q{index + 1}: {mcq.question}
              </h4>
              <ul className={styles.mcqOptions}>
                {mcq.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
              <p className={styles.answer}>
                <strong>Answer:</strong> {mcq.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
