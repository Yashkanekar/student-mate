import { useDispatch, useSelector } from "react-redux";
import { selectSubject } from "../../features/class/classSlice";
import styles from "./ClassSetup.module.css";
import { SYLLABUS } from "../../data/mockData";

const ClassSetup = () => {
  const selectedSubject = useSelector((state) => state.class.selectedSubject);
  const dispatch = useDispatch();

  const handleSubjectSelect = (e) => {
    dispatch(selectSubject(e.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectSection}>
        <label htmlFor="subject-select" className={styles.label}>
          Please select a subject:
        </label>
        <select
          id="subject-select"
          onChange={handleSubjectSelect}
          defaultValue={selectedSubject}
          className={styles.select}
        >
          <option value="" disabled>
            -- Select --
          </option>
          {Object.keys(SYLLABUS).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.syllabus}>
        {selectedSubject ? (
          <>
            <h2 className={styles.syllabusTitle}>
              Syllabus for {selectedSubject}
            </h2>
            <ol className={styles.syllabusList}>
              {SYLLABUS[selectedSubject].map((item) => (
                <li key={item} className={styles.syllabusItem}>
                  {item}
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className={styles.placeholderText}>
            Please select a subject to see the syllabus.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClassSetup;
