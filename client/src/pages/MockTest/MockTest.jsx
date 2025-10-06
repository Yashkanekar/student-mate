import React, { useState } from "react";
import CodingQuestion from "../../components/common/CodingQuestion/CodingQuestion";
import styles from "./MockTest.module.css";

const MockTest = ({ subject, questions }) => {
  const { mcqs = [], coding = [] } = questions || {};

  const [mcqAnswers, setMcqAnswers] = useState(Array(mcqs.length).fill(null));
  const [codingResults, setCodingResults] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleMcqChange = (idx, answer) => {
    if (submitted) return;
    const updated = [...mcqAnswers];
    updated[idx] = answer;
    setMcqAnswers(updated);
  };

  const handleCodingResult = (id, passed) => {
    setCodingResults((prev) => ({ ...prev, [id]: passed }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const mcqScore = mcqs.reduce(
    (acc, q, i) => acc + (mcqAnswers[i] === q.correctAnswer ? 1 : 0),
    0
  );
  const codingScore = coding.reduce(
    (acc, cq) => acc + (codingResults[cq.id] ? 1 : 0),
    0
  );
  const totalQuestions = mcqs.length + coding.length;
  const totalScore = mcqScore + codingScore;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mock Test: {subject}</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>MCQs</h3>
        {mcqs.map((q, i) => (
          <div key={i} className={styles.mcqItem}>
            <p className={styles.mcqQuestion}>
              <strong>Q{i + 1}:</strong> {q.question}
            </p>
            {q.options.map((opt) => (
              <label key={opt} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={`mcq-${i}`}
                  value={opt}
                  disabled={submitted}
                  checked={mcqAnswers[i] === opt}
                  onChange={() => handleMcqChange(i, opt)}
                  className={styles.radioInput}
                />
                {opt}
              </label>
            ))}
            {submitted && (
              <p
                className={
                  mcqAnswers[i] === q.correctAnswer
                    ? styles.correctAnswerText
                    : styles.incorrectAnswerText
                }
              >
                Correct answer: <strong>{q.correctAnswer}</strong>
              </p>
            )}
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Coding Questions</h3>
        {coding.map((cq) => (
          <CodingQuestion
            key={cq.id}
            question={cq}
            disabled={submitted}
            onTestResult={(passed) => handleCodingResult(cq.id, passed)}
          />
        ))}
      </section>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={mcqAnswers.includes(null)}
          className={styles.submitButton}
        >
          Submit Test
        </button>
      )}

      {submitted && (
        <section className={styles.scoreSection}>
          <h3 className={styles.sectionTitle}>Test Results</h3>
          <p className={styles.scoreBreakdownItem}>
            MCQ Score: {mcqScore} / {mcqs.length}
          </p>
          <p className={styles.scoreBreakdownItem}>
            Coding Score: {codingScore} / {coding.length}
          </p>
          <p className={styles.scoreBreakdownItem}>
            <strong>
              Total Score: {totalScore} / {totalQuestions}
            </strong>
          </p>
        </section>
      )}
    </div>
  );
};

export default MockTest;
