import React from "react";
import {
  generatePrefix,
  generatePostfix,
  solvePrefix,
  solvePostfix,
} from "./expressionGenerator";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Button, Fade } from "react-bootstrap";
import Expression from "./Components/expressionVisualizer";
import Game from "./Components/Game";

function App() {
  // pages represent what's currently shown
  const [pageShown, setPageShown] = React.useState("welcome");
  const [gameStarted, setGameStarted] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState({
    question: ["*", "3", "3"],
    answer: 9,
    number: 1,
    type: "prefix",
  });
  const [isEndless, setIsEndlesss] = React.useState(false);

  function startGame(type) {
    // Type is either postfix or prefix
    // This should generate question/answer, reset number, and set type
    if (type == "prefix") {
      const prefixExpression = generatePrefix(1);
      setCurrentQuestion({
        question: prefixExpression,
        answer: solvePrefix(prefixExpression),
        number: 1,
        type: "prefix",
      });
    } else {
      const postfixExpression = generatePostfix(1);
      setCurrentQuestion({
        question: postfixExpression,
        answer: solvePostfix(postfixExpression),
        number: 1,
        type: "postfix",
      });
    }
    setPageShown("game");
    setGameStarted(true);
  }

  function nextQuestion() {
    setCurrentQuestion((prev) => {
      let depth;
      if (prev.number + 1 <= 3) {
        depth = 1;
      } else if (prev.number + 1 <= 6) {
        depth = 2;
      } else {
        depth = 3;
      }
      let newExpression;
      let newAnswer;
      if (prev.type == "prefix") {
        newExpression = generatePrefix(depth);
        newAnswer = solvePrefix(newExpression);
      } else {
        newExpression = generatePostfix(depth);
        newAnswer = solvePostfix(newExpression);
      }
      return {
        question: newExpression,
        answer: newAnswer,
        number: prev.number + 1,
        type: prev.type,
      };
    });
  }

  return (
    <div className="p-5">
      <Fade in={pageShown === "welcome"}>
        <div hidden={pageShown !== "welcome"} className="text-center">
          <Button
            variant="primary"
            className="me-5"
            size="lg"
            onClick={() => setPageShown("prefixExplanation")}
          >
            Learn about Prefix!
          </Button>
          <Button
            variant="primary"
            className="ms-5"
            size="lg"
            onClick={() => setPageShown("postfixExplanation")}
          >
            Learn about Postfix!
          </Button>
        </div>
      </Fade>

      <Fade in={pageShown === "prefixExplanation"} timeout={1000}>
        <div
          className="m-5 p-3 bg-warning rounded-pill text-center"
          hidden={pageShown !== "prefixExplanation"}
        >
          <p className="fs-5 text-center">
            This is prefix: + * 3 3 4, and it evaluates to 13!
          </p>
          <Button
            variant="success"
            size="lg"
            onClick={() => startGame("prefix")}
          >
            I'm ready!
          </Button>
        </div>
      </Fade>
      <Fade in={pageShown === "postfixExplanation"} timeout={1000}>
        <div
          className="m-5 p-3 bg-light rounded-pill text-center"
          hidden={pageShown !== "postfixExplanation"}
        >
          <div className="fs-5 text-center h-50">
            <Expression expression={[4, 4, 3, "+", "*"]} className="w-50" />
            This a postfix expression.
            <Expression expression={[4, "+", 3]} className="w-50" />
            Instead of having the operator in between numbers, like this...
            <Expression expression={["+", 4, 3]} className="w-50" />
            ...the operator is after the numbers.
          </div>
          <Button
            variant="success"
            size="lg"
            onClick={() => startGame("postfix")}
          >
            I'm ready!
          </Button>
        </div>
      </Fade>
      <Game
        currentQuestion={currentQuestion}
        hidden={!gameStarted || (currentQuestion.number >= 8 && !isEndless)}
        nextQuestion={nextQuestion}
        isEndless={isEndless}
        endGame={() => {
          setPageShown("welcome");
          setGameStarted(false);
          setCurrentQuestion((prev) => {
            return { ...prev, number: 1 };
          });
        }}
      />
      <div hidden={!(currentQuestion.number >= 8 && !isEndless)}>
        <p className="text-center fs-1">Great Job!</p>
        <div className="text-center">
          <Button
            variant="primary"
            className="me-4"
            onClick={() => {
              setPageShown("welcome");
              setGameStarted(false);
              setCurrentQuestion((prev) => {
                return { ...prev, number: 1 };
              });
            }}
          >
            Back to menu
          </Button>
          <Button
            variant="primary"
            className="ms-4"
            onClick={() => setIsEndlesss(true)}
          >
            Endless mode (same difficulty)
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
