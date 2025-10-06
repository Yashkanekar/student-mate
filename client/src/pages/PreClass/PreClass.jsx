import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentProcessor from "../../components/common/DocumentProcessor/DocumentProcessor";
import { setPreClassDocument } from "../../features/class/classSlice";
import styles from "./PreClassPage.module.css";

const PreClassPage = () => {
  const dispatch = useDispatch();
  const { preClassSummary, preClassMcqs } = useSelector((state) => state.class);

  const handleDocumentProcessed = (data) => {
    dispatch(setPreClassDocument(data));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pre-Class Material</h2>

      <DocumentProcessor
        onProcessComplete={handleDocumentProcessed}
        buttonText="Upload Pre-Class Document"
      />

      {preClassSummary && (
        <div className={styles.section}>
          <h3>Summary</h3>
          <p>{preClassSummary}</p>
        </div>
      )}

      {preClassMcqs.length > 0 && (
        <div className={styles.section}>
          <h3>Practice Questions</h3>
          {preClassMcqs.map((mcq, index) => (
            <div key={index} className={styles.mcqItem}>
              <h4 className={styles.mcqQuestion}>
                Q{index + 1}: {mcq.question}
              </h4>
              <ul className={styles.optionsList}>
                {mcq.options.map((option, optIndex) => (
                  <li key={optIndex}>{option}</li>
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

export default PreClassPage;
