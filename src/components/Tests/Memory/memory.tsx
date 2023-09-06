import { useEffect, useState } from "react";
import "./memory.css";
import { Link } from "react-router-dom";
import { words } from "./memorywords";
import { getRandomIndex } from "../../../utils/getRandomIndex";
import check from "./check.png";
import cross from "./heart.png";
import again from "../Mini-stroop/again.png";
enum Scene {
  Intros = "intros",
  Test = "test",
  Results = "results",
}

export function Memory() {
  const [currentIndex, setCurrrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(3);
  const [scene, setScene] = useState(Scene.Intros);
  const [oldItems, setOldItems] = useState<string[]>([]);
  const newWords: string[] = [];

  // Work on random index

  // random indexes are drawn from words array and push to newWords
  const numRandom = 30;
  for (let i = 0; i < numRandom; i++) {
    const randomIndex = getRandomIndex(words.length);
    newWords.push(words[randomIndex]);
  }

  function start() {
    setScene(Scene.Test);
    setOldItems([]);
    setScore(0);
    setIncorrect(3);
  }

  if (currentIndex === numRandom - 1) {
    setCurrrentIndex(0);
  }

  useEffect(() => {
    if (incorrect === 0) {
      setScene(Scene.Results);
    }
  }, [incorrect]);

  function btnOnclick() {
    setOldItems((prev) => [...prev, newWords[currentIndex]]);
    setCurrrentIndex(currentIndex + 1);
  }

  function newBtn() {
    btnOnclick();
    if (!oldItems.includes(newWords[currentIndex])) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrect((prev) => prev - 1);
    }
  }

  function oldBtn() {
    btnOnclick();
    if (oldItems.includes(newWords[currentIndex])) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrect((prev) => prev - 1);
    }
  }

  return (
    <div className="test">
      {(() => {
        switch (scene) {
          case Scene.Test:
            return (
              <div className="test-part">
                <div className="live">
                  <div className="cont">
                    <img className="live-score" src={check} alt="" />
                    <h1 style={{ fontSize: "25px" }}>{score}</h1>
                  </div>
                  <div className="cont">
                    <img
                      className="live-score"
                      style={{ width: "35%" }}
                      src={cross}
                      alt=""
                    />
                    <h1 style={{ fontSize: "25px", marginLeft: "2%" }}>
                      {" "}
                      {incorrect}
                    </h1>
                  </div>
                </div>

                <div style={{ fontSize: "70px" }}>{newWords[currentIndex]}</div>

                <div className="btns">
                  <button className="btn" onClick={oldBtn}>
                    Old
                  </button>
                  <button className="btn btn-home" onClick={newBtn}>
                    New
                  </button>
                </div>
              </div>
            );
          case Scene.Results:
            return (
              <div className="result">
                <h2 className="head">Result</h2>
                <h3>Score: {score} Words</h3>
                <h3></h3>
                <div className="btns">
                  <button
                    className="btn"
                    onClick={() => setScene(Scene.Intros)}
                  >
                    Memory Test
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
                <h1 className="head">VERBAL MEMORY</h1>
                <p>
                  During the test, you will be presented with a series of words,
                  one at a time. If you have encountered a word before, please
                  click <b>'OLD'</b>. If the word is entirely new to you, please
                  click <b>'NEW'</b>.
                </p>
                <button className="btn" onClick={start}>
                  Start
                </button>
              </div>
            );
        }
      })()}
    </div>
  );
}
