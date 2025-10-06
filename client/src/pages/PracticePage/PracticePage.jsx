
import { useSelector } from "react-redux";
import styles from "./PracticePage.module.css";
import CodingQuestion from "../../components/common/CodingQuestion/CodingQuestion";
import { PRACTICE_QUESTIONS } from "../../data/mockData";


const PracticePage = () => {
  const selectedSubject = useSelector((state) => state.class.selectedSubject);

  if (!selectedSubject || !PRACTICE_QUESTIONS[selectedSubject]) {
    return (
      <p className={styles.pageContainer}>
        Please select a subject to view practice questions.
      </p>
    );
  }

  const { theory, coding } = PRACTICE_QUESTIONS[selectedSubject];

  return (
    <div className={styles.pageContainer} style={{ display: "flex", gap: 24 }}>
      <main style={{ flex: 1 }}>
        <section className={styles.section}>
          <h2 className={styles.heading}>
            Theory Questions - {selectedSubject}
          </h2>

          {theory.length === 0 && (
            <p className={styles.noQuestions}>No theory questions available.</p>
          )}

          <ul>
            {theory.map(({ question, answer }, i) => (
              <li key={i} className={styles.questionItem}>
                <strong>Q{i + 1}:</strong> {question}
                <br />
                <em>
                  <strong>Answer:</strong> {answer}
                </em>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>
            Coding Questions - {selectedSubject}
          </h2>

          {coding.length === 0 && (
            <p className={styles.noQuestions}>No coding questions available.</p>
          )}

          {coding.map((cq) => (
            <CodingQuestion key={cq.id} question={cq} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default PracticePage;
