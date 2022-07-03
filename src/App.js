import React from "react";
import {
  generatePrefix,
  generatePostfix,
  solvePrefix,
  solvePostfix,
} from "./expressionGenerator";
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
  const [explanationState, setExplanationState] = React.useState(1);
  const [explanationHighlight, setExplanationHighlight] = React.useState(null);

  function startGame(type) {
    // Type is either postfix or prefix
    // This should generate question/answer, reset number, and set type
    if (type === "prefix") {
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
      if (prev.type === "prefix") {
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
    <div className="p-5 bg-dark text-light vh-100">
      <Fade in={pageShown === "welcome"}>
        <div hidden={pageShown !== "welcome"} className="text-center">
          <Button
            variant="primary"
            className="me-5"
            size="lg"
            onClick={() => setPageShown("prefixExplanation")}
          >
            Learn about Prefix notation!
          </Button>
          <Button
            variant="primary"
            className="ms-5"
            size="lg"
            onClick={() => setPageShown("postfixExplanation")}
          >
            Learn about Postfix notation!
          </Button>
        </div>
      </Fade>

      <Fade in={pageShown === "prefixExplanation"} timeout={1000}>
        <div
          className="m-5 p-3 bg-secondary rounded text-center text-light"
          hidden={pageShown !== "prefixExplanation"}
        >
          <div className="fs-5 text-center h-50">
            <Row>
              <Col xs={{ span: 1, offset: 11 }}>
                <Button
                  variant="primary"
                  className="float-end"
                  onClick={() => {
                    setPageShown("welcome");
                    setGameStarted(false);
                    setExplanationHighlight(null);
                    setExplanationState(1);
                    setCurrentQuestion((prev) => {
                      return { ...prev, number: 1 };
                    });
                  }}
                >
                  Home
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="">
                <Fade in={explanationState === 1}>
                  <section id="prefixExplain1" hidden={explanationState !== 1}>
                    <div>
                      <h1>What is prefix notation?</h1>
                      <Expression
                        expression={["*", "+", 4, 3, 3]}
                        className=""
                      />
                      This is a prefix expression.
                    </div>
                  </section>
                </Fade>
                <Fade in={explanationState === 2}>
                  <section id="prefixExplain2" hidden={explanationState !== 2}>
                    <div>
                      <Expression expression={[4, "+", 3]} className="" />
                      Instead of having the operator in between numbers, called
                      infix notation...
                    </div>
                  </section>
                </Fade>
                <Fade in={explanationState === 3}>
                  <section id="prefixExplain3" hidden={explanationState !== 3}>
                    <div>
                      <Expression expression={["+", 4, 3]} className="" />
                      ...the operator is before the numbers.
                    </div>
                  </section>
                </Fade>
                <Fade in={explanationState === 4}>
                  <section id="prefixExplain4" hidden={explanationState !== 4}>
                    <h1 className="mb-5">Why prefix?</h1>
                    Prefix notation removes the need for parentheses, since the
                    order of operations is completely unambiguous.
                  </section>
                </Fade>
                <Fade in={explanationState === 5}>
                  <section id="prefixExplain5" hidden={explanationState !== 5}>
                    Here is a demonstration of how to solve a prefix expression.
                    Hover over the different parts of the expression to see the
                    order of operations. The answer is on the next page.
                    <Row className="explain-expression-row row-cols-auto justify-content-center">
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-light ")
                        }
                        onMouseOver={() => setExplanationHighlight(1)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">+</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-danger ") +
                          (explanationHighlight === 2 && " text-success ")
                        }
                        onMouseOver={() => setExplanationHighlight(2)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">*</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-danger ") +
                          (explanationHighlight === 2 && " text-success ")
                        }
                        onMouseOver={() => setExplanationHighlight(2)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">5</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-danger ") +
                          (explanationHighlight === 2 && " text-success ")
                        }
                        onMouseOver={() => setExplanationHighlight(2)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">3</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-info ") +
                          (explanationHighlight === 3 && " text-warning ")
                        }
                        onMouseOver={() => setExplanationHighlight(3)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">-</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-info ") +
                          (explanationHighlight === 3 && " text-warning ")
                        }
                        onMouseOver={() => setExplanationHighlight(3)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">7</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-info ") +
                          (explanationHighlight === 3 && " text-warning ")
                        }
                        onMouseOver={() => setExplanationHighlight(3)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">6</p>
                      </Col>
                    </Row>
                  </section>
                </Fade>
                <Fade in={explanationState === 6}>
                  <section id="prefixExplain6" hidden={explanationState !== 6}>
                    The answer was 16. When you are ready, click the button to
                    start the game!
                    <br />
                    <Button
                      className="mt-3"
                      variant="success"
                      size="lg"
                      onClick={() => startGame("prefix")}
                    >
                      I'm ready!
                    </Button>
                  </section>
                </Fade>
                <Fade in={explanationState === 7}>
                  <section id="prefixExplain7" hidden={explanationState !== 7}>
                    ipssummmm 7
                  </section>
                </Fade>
                <Fade in={explanationState === 8}>
                  <section id="prefixExplain8" hidden={explanationState !== 8}>
                    loreeememme
                  </section>
                </Fade>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={{ span: 1, offset: 5 }}>
                <Button
                  className=""
                  variant="success"
                  hidden={explanationState >= 6}
                  onClick={() => {
                    setExplanationState((prev) => prev + 1);
                  }}
                >
                  Next
                </Button>
              </Col>
              <Col xs={1}>
                <Button
                  className=""
                  variant="primary"
                  hidden={explanationState < 2}
                  onClick={() => {
                    setExplanationState((prev) => prev - 1);
                  }}
                >
                  Back
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Fade>
      <Fade in={pageShown === "postfixExplanation"} timeout={1000}>
        <div
          className="m-5 p-3 bg-secondary rounded text-center text-light"
          hidden={pageShown !== "postfixExplanation"}
        >
          <div className="fs-5 text-center h-50">
            <Row>
              <Col xs={{ span: 1, offset: 11 }}>
                <Button
                  variant="primary"
                  className="float-end"
                  onClick={() => {
                    setPageShown("welcome");
                    setGameStarted(false);
                    setExplanationHighlight(null);
                    setExplanationState(1);
                    setCurrentQuestion((prev) => {
                      return { ...prev, number: 1 };
                    });
                  }}
                >
                  Home
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="">
                <Fade in={explanationState === 1}>
                  <section id="postfixExplain1" hidden={explanationState !== 1}>
                    <div>
                      <h1>What is postfix notation?</h1>
                      <Expression
                        expression={[3, 4, "+", 3, "*"]}
                        className=""
                      />
                      This is a postfix expression.
                    </div>
                  </section>
                </Fade>
                <Fade in={explanationState === 2}>
                  <section id="postfixExplain2" hidden={explanationState !== 2}>
                    <div>
                      <Expression expression={[4, "+", 3]} className="" />
                      Instead of having the operator in between numbers, called
                      infix notation...
                    </div>
                  </section>
                </Fade>
                <Fade in={explanationState === 3}>
                  <section id="postfixExplain3" hidden={explanationState !== 3}>
                    <div>
                      <Expression expression={[4, 3, "+"]} className="" />
                      ...the operator is after the numbers.
                    </div>
                  </section>
                </Fade>
                <Fade in={explanationState === 4}>
                  <section id="postfixExplain4" hidden={explanationState !== 4}>
                    <h1 className="mb-5">Why postfix?</h1>
                    Postfix notation removes the need for parentheses, since the
                    order of operations is completely unambiguous.
                  </section>
                </Fade>
                <Fade in={explanationState === 5}>
                  <section id="postfixExplain5" hidden={explanationState !== 5}>
                    Here is a demonstration of how to solve a postfix
                    expression. Hover over the different parts of the expression
                    to see the order of operations. The answer to this question
                    is on the next page.
                    <Row className="explain-expression-row row-cols-auto justify-content-center">
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-danger ") +
                          (explanationHighlight === 2 && " text-success ")
                        }
                        onMouseOver={() => setExplanationHighlight(2)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">9</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-danger ") +
                          (explanationHighlight === 2 && " text-success ")
                        }
                        onMouseOver={() => setExplanationHighlight(2)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">2</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-danger ") +
                          (explanationHighlight === 2 && " text-success ")
                        }
                        onMouseOver={() => setExplanationHighlight(2)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">*</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-info ") +
                          (explanationHighlight === 3 && " text-warning ")
                        }
                        onMouseOver={() => setExplanationHighlight(3)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">4</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-info ") +
                          (explanationHighlight === 3 && " text-warning ")
                        }
                        onMouseOver={() => setExplanationHighlight(3)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">10</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-info ") +
                          (explanationHighlight === 3 && " text-warning ")
                        }
                        onMouseOver={() => setExplanationHighlight(3)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">-</p>
                      </Col>
                      <Col
                        className={
                          "bg-secondary m-2 expression-column px-4 py-2 part-1 " +
                          (explanationHighlight === 1 && " text-light ")
                        }
                        onMouseOver={() => setExplanationHighlight(1)}
                        onMouseLeave={() => setExplanationHighlight(null)}
                      >
                        <p className="fs-1 align-midddle my-auto inline">+</p>
                      </Col>
                    </Row>
                  </section>
                </Fade>
                <Fade in={explanationState === 6}>
                  <section id="postfixExplain6" hidden={explanationState !== 6}>
                    The answer was 12. When you are ready, click the button to
                    start the game!
                    <br />
                    <Button
                      className="mt-3"
                      variant="success"
                      size="lg"
                      onClick={() => startGame("postfix")}
                    >
                      I'm ready!
                    </Button>
                  </section>
                </Fade>
                <Fade in={explanationState === 7}>
                  <section id="postfixExplain7" hidden={explanationState !== 7}>
                    ipssummmm 7
                  </section>
                </Fade>
                <Fade in={explanationState === 8}>
                  <section id="postfixExplain8" hidden={explanationState !== 8}>
                    loreeememme
                  </section>
                </Fade>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={{ span: 1, offset: 5 }}>
                <Button
                  className=""
                  variant="success"
                  hidden={explanationState >= 6}
                  onClick={() => {
                    setExplanationState((prev) => prev + 1);
                  }}
                >
                  Next
                </Button>
              </Col>
              <Col xs={1}>
                <Button
                  className=""
                  variant="primary"
                  hidden={explanationState < 2}
                  onClick={() => {
                    setExplanationState((prev) => prev - 1);
                  }}
                >
                  Back
                </Button>
              </Col>
            </Row>
          </div>
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
          setExplanationHighlight(null);
          setExplanationState(1);
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
              setExplanationHighlight(null);
              setExplanationState(1);
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
