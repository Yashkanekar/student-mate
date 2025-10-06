import { Editor } from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import styles from "./CodingQuestion.module.css";

const CodingQuestion = ({ question, disabled, onTestResult }) => {
  const [code, setCode] = useState(question.template);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  const runTests = () => {
    setResults(null);
    setError(null);
    if (!iframeRef.current?.contentWindow) {
      setError("Sandbox iframe is not ready");
      if (onTestResult) onTestResult(false);
      return;
    }

    const escapedCode = JSON.stringify(code);
    const QUESTION_ID = JSON.stringify(question.id);
    const testCasesStr = JSON.stringify(question.testCases || []);

    const testScript = `
      (function(){
        try {
          const userCode = ${escapedCode};
          eval(userCode);

          const userFunc = ${QUESTION_ID} && (typeof window !== 'undefined' ? window[${QUESTION_ID}] : undefined) || (typeof eval(${QUESTION_ID}) === 'function' ? eval(${QUESTION_ID}) : undefined);

          const testCases = ${testCasesStr};
          let results = [];

          if (typeof userFunc !== 'function') {
            throw new Error('Function "' + ${QUESTION_ID} + '" is not defined or is not a function');
          }

          testCases.forEach(({ input, expected }) => {
            let output;
            try {
              if (Array.isArray(input)) {
                output = userFunc(...input);
              } else {
                output = userFunc(input);
              }
            } catch (e) {
              output = { __runtimeError: e.message };
            }

            const pass = JSON.stringify(output) === JSON.stringify(expected);
            results.push({ input, expected, output, pass });
          });

          parent.postMessage({ results, questionId: ${QUESTION_ID} }, "*");
        } catch (e) {
          parent.postMessage({ error: e.message, questionId: ${QUESTION_ID} }, "*");
        }
      })();
    `;

    iframeRef.current.contentWindow.postMessage({ script: testScript }, "*");
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const payload = event.data || {};

      if (payload.questionId !== question.id) return;

      if (payload.results) {
        setResults(payload.results);
        if (onTestResult) {
          const allPass = payload.results.every((r) => r.pass);
          onTestResult(allPass);
        }
      } else if (payload.error) {
        setError(payload.error);
        if (onTestResult) onTestResult(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [question.id, onTestResult]);

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{question.title}</h5>
      <p className={styles.description}>{question.description}</p>

      <div>
        <label className={styles.label}>Code</label>
        <Editor
          height="400px"
          language="javascript"
          value={code}
          onChange={(value) => setCode(value ?? "")}
          theme="vs-dark"
          options={{
            readOnly: !!disabled,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={runTests}
          disabled={disabled}
        >
          Run Tests
        </button>
      </div>

      <iframe
        ref={iframeRef}
        title={`sandbox-${question.id}`}
        srcDoc={`<script>
          window.addEventListener('message', event => {
            try {
              if (event.data && event.data.script) {
                eval(event.data.script);
              }
            } catch(e) {
              parent.postMessage({ error: e.message, questionId: ${JSON.stringify(
                question.id
              )} }, '*');
            }
          });
        </script>`}
        style={{ display: "none" }}
      />

      {error && <div className={styles.errorMessage}>Error: {error}</div>}

      {results && (
        <div className={styles.resultsContainer}>
          {results.map((r, i) => (
            <div
              key={i}
              className={`${styles.testResult} ${
                r.pass ? styles.pass : styles.fail
              }`}
            >
              <strong>Test {i + 1}:</strong> Input: {JSON.stringify(r.input)} |
              Expected: {JSON.stringify(r.expected)} | Output:{" "}
              {JSON.stringify(r.output)} | {r.pass ? "Pass" : "Fail"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodingQuestion;
