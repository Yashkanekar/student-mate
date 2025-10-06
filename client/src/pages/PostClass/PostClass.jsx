import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentProcessor from "../../components/common/DocumentProcessor/DocumentProcessor";
import { setPostClassDocument } from "../../features/class/classSlice";
import styles from "./PostClass.module.css";

const PostClassPage = () => {
  const dispatch = useDispatch();
  const { postClassSummary, postClassMcqs } = useSelector(
    (state) => state.class
  );

  const handleDocumentProcessed = (data) => {
    dispatch(setPostClassDocument(data));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Post-Class Review</h2>
      <DocumentProcessor
        onProcessComplete={handleDocumentProcessed}
        buttonText="Upload Study Material"
      />

      {postClassSummary && (
        <div className={styles.summarySection}>
          <h3 className={styles.sectionTitle}>Review Summary</h3>
          <p className={styles.summaryText}>{postClassSummary}</p>
        </div>
      )}

      {postClassMcqs.length > 0 && (
        <div className={styles.mcqsSection}>
          <h3 className={styles.sectionTitle}>Review Questions</h3>
          {postClassMcqs.map((mcq, index) => (
            <div key={index} className={styles.mcqItem}>
              <h4 className={styles.mcqQuestion}>
                Q{index + 1}: {mcq.question}
              </h4>
              <ul className={styles.mcqOptions}>
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

export default PostClassPage;
