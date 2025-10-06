import { useSelector } from "react-redux";
import MockTest from "./MockTest";
import styles from "./MockTestPage.module.css";
import { MOCK_TESTS } from "../../data/mockData";

const MockTestPage = () => {
  const selectedSubject = useSelector((state) => state.class.selectedSubject);
  if (!selectedSubject) {
    return (
      <p className={styles.container}>
        Please select a subject to take mock tests.
      </p>
    );
  }
  if (!MOCK_TESTS[selectedSubject]) {
    return (
      <p className={styles.container}>
        <strong>{selectedSubject}</strong> has no test questions present.
      </p>
    );
  }

  const subjectData = MOCK_TESTS[selectedSubject];

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <div>
          <h3>Theory / MCQs</h3>
          <MockTest subject={selectedSubject} questions={subjectData} />
        </div>
      </main>
    </div>
  );
};

export default MockTestPage;
