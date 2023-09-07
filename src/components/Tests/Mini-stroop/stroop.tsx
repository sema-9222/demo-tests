import "./stroop.css";
import { newColor, newName } from "./randomcolor";
import { useEffect, useState } from "react";
import check from "./check.png";
import cross from "./cross.png";
import { Link } from "react-router-dom";
import again from "./again.png";
enum Scene {
  Instruction = "instruction",
  Test = "test",
  Results = "results",
}

export function Stroop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [missed, setMissed] = useState(0);
  const [scene, setScene] = useState(Scene.Instruction);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [congruent, setCongruent] = useState<any[]>([]);
  const [incongruent, setIncongruent] = useState<number[]>([]);

  useEffect(() => {
    if (scene === Scene.Test) {
      setTime(0);
      setRunning(true);
    } else {
      setRunning(false);
      setTime(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  function start() {
    setScene(Scene.Instruction);
    setIncorrect(0);
    setMissed(0);
    setScore(0);
    setCurrentIndex(0);
    setTime(0);
    setCongruent([]);
    setIncongruent([]);
  }

  useEffect(() => {
    if (scene !== Scene.Test) {
      return;
    }

    const secondTimeout = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setMissed((prev) => prev + 1);
    }, 2000);

    return () => {
      clearTimeout(secondTimeout);
    };
  }, [scene, currentIndex]);

  useEffect(() => {
    if (currentIndex === 30) {
      setScene(Scene.Results);
    }
    if (scene === Scene.Test) {
      const keyDownHandler = (e: KeyboardEvent) => {
        if (scene !== Scene.Test) {
          return;
        }
        const currentColor = newColor[currentIndex];
        const currentColorLetter = currentColor[0];

        if (e.key === currentColorLetter) {
          setScore((prev) => prev + 1);
          setRunning(false);
          if (currentColor === newName[currentIndex]) {
            setCongruent((prev) => [...prev, time]);
          } else {
            setIncongruent((prev) => [...prev, time]);
          }
          setCurrentIndex((prev) => prev + 1);
        } else {
          setRunning(false);
          setCurrentIndex((prev) => prev + 1);
          setIncorrect((prev) => prev + 1);
        }
      };

      document.addEventListener("keydown", keyDownHandler);

      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [currentIndex]);

  const congruentResult = Number(
    (congruent.reduce((a, b) => a + b, 0) / congruent.length).toFixed(0)
  );
  const incongruentResult = Number(
    (incongruent.reduce((a, b) => a + b, 0) / incongruent.length).toFixed(0)
  );

  console.log(congruentResult);
  console.log(incongruentResult);
  return (
    <div className="test">
      {(() => {
        switch (scene) {
          case Scene.Test:
            return (
              <div className="test-part1">
                <div className="live live1">
                  <div className="cont">
                    <img
                      className="live-score"
                      style={{ width: "30px" }}
                      src={check}
                      alt=""
                    />
                    <h1 style={{ fontSize: "25px", marginLeft: "2%" }}>
                      {score}
                    </h1>
                  </div>
                  <div className="cont">
                    <img
                      style={{ width: "30px" }}
                      className="live-score"
                      src={cross}
                      alt=""
                    />
                    <h1 style={{ fontSize: "25px", marginLeft: "2%" }}>
                      {" "}
                      {incorrect}
                    </h1>
                  </div>
                </div>
                <h1
                  style={{
                    color: `${newColor[currentIndex]}`,
                    fontSize: "100px",
                    margin: "0px",
                  }}
                >
                  {newName[currentIndex]}
                </h1>
              </div>
            );

          case Scene.Results:
            return (
              <div className="result">
                <h1 style={{ fontSize: "40px" }}>Results</h1>
                <div className="table">
                  <div className="scores">
                    <h3>
                      Score:{" "}
                      <span style={{ fontWeight: "normal" }}>{score}</span>
                    </h3>
                    <h3>
                      Incorrect:{" "}
                      <span style={{ fontWeight: "normal" }}>{incorrect}</span>
                    </h3>
                    <h3>
                      Missed:{" "}
                      <span style={{ fontWeight: "normal" }}>{missed}</span>
                    </h3>
                    <h3>
                      Congruent reaction time:{" "}
                      {isNaN(congruentResult) ? (
                        <span style={{ fontWeight: "normal" }}>
                          No reaction time measured
                        </span>
                      ) : (
                        <span style={{ fontWeight: "normal" }}>
                          {congruentResult} ms
                        </span>
                      )}
                    </h3>
                    <h3>
                      Incongruent reaction time:{" "}
                      {isNaN(incongruentResult) ? (
                        <span style={{ fontWeight: "normal" }}>
                          No reaction time measured
                        </span>
                      ) : (
                        <span style={{ fontWeight: "normal" }}>
                          {incongruentResult} ms
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                <div className="btns">
                  <button className="btn" onClick={start}>
                    Stroop Test
                    <img
                      src={again}
                      style={{ width: "14px", marginLeft: "6%" }}
                      alt=""
                    />
                  </button>
                  <Link to="/" style={{ width: "20%" }}>
                    <button className="btn btn1">Home Page</button>
                  </Link>
                </div>
              </div>
            );

          default:
            return (
              <div className="intro">
                <h1 className="head">Mini Stroop</h1>
                <p>
                  In this test you are required to press the "r", "g", "b" and
                  "y" keyboard buttons to identify the color of the word you
                  see, not what the word says. For example, for the word,
                  <span style={{ color: "red" }}>
                    <b> YELLOW </b>
                  </span>
                  , you should choose <b>"Red."</b>
                  <br />
                  <br />
                  For green color you should press{" "}
                  <span style={{ color: "green" }}>
                    <b>"g"</b>
                  </span>
                  , for red color you should press{" "}
                  <span style={{ color: "red" }}>
                    <b>"r"</b>
                  </span>
                  , for yellow it should be{" "}
                  <span style={{ color: "yellow" }}>
                    <b>"y"</b>
                  </span>{" "}
                  and for blue it should be{" "}
                  <span style={{ color: "blue" }}>
                    <b>"b"</b>
                  </span>
                  .
                </p>
                <button className="btn" onClick={() => setScene(Scene.Test)}>
                  Start
                </button>
              </div>
            );
            break;
        }
      })()}
    </div>
  );
}
