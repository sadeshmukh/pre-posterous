import React from "react";
import { Fade, Form, Button, Row, Col } from "react-bootstrap";
import Expression from "./expressionVisualizer";
import Case from "case";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

function Game({ currentQuestion, hidden, nextQuestion, isEndless, endGame }) {
  // Current question comprises of the question, answer, number, and type (postfix/prefix/infix)

  const [userGuess, setUserGuess] = React.useState("");
  const [prevAnswer, setPrevAnswer] = React.useState(null);
  // Three possible states: incorrect, correct, ready
  const [validationState, setValidationState] = React.useState("ready");

  function validateAnswer(event) {
    setUserGuess("");
    if (parseInt(userGuess) === currentQuestion.answer) {
      setValidationState("correct");
    } else {
      setValidationState("incorrect");
    }
    event.preventDefault();
  }

  return (
    <Fade in={!hidden}>
      <div hidden={hidden}>
        <Button className="float-end" variant="danger" onClick={endGame}>
          End Game
        </Button>
        <h1>{Case.capital(currentQuestion.type)} Game</h1>

        <Expression expression={currentQuestion.question} />
        <Form onSubmit={validateAnswer}>
          <div>
            <Row className="mt-5">
              <Col xs={2} className="text-center">
                <Fade in={validationState === "correct"}>
                  <div hidden={validationState !== "correct"}>
                    <DoneIcon />{" "}
                    <span className="align-middle fs-4">Correct!</span>
                  </div>
                </Fade>
                <Fade in={validationState === "incorrect"}>
                  <div hidden={validationState !== "incorrect"}>
                    <ClearIcon />{" "}
                    <span className="align-middle fs-4">Incorrect.</span>
                  </div>
                </Fade>
              </Col>
              <Col xs={8}>
                <Form.Control
                  type="number"
                  placeholder="Type your answer here"
                  value={userGuess}
                  onChange={(event) => setUserGuess(event.target.value)}
                />
              </Col>
              <Col xs={1}>
                {" "}
                <Button
                  type="submit"
                  variant="success"
                  className="mx-auto"
                  hidden={validationState === "correct"}
                >
                  Submit
                </Button>
                <Button
                  variant="success"
                  className="mx-auto"
                  hidden={validationState !== "correct"}
                  onClick={() => {
                    setUserGuess("");
                    setValidationState("ready");
                    setPrevAnswer(null);
                    nextQuestion();
                  }}
                >
                  Next
                </Button>
              </Col>
              <Col xs={1}>
                <Fade in={validationState === "incorrect"}>
                  <div hidden={validationState !== "incorrect"}>
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        setUserGuess("");
                        setValidationState("ready");
                        setPrevAnswer(currentQuestion.answer);
                        nextQuestion();
                      }}
                    >
                      Skip
                    </Button>
                  </div>
                </Fade>
              </Col>
            </Row>
          </div>
        </Form>
        <div hidden={prevAnswer === null}>
          <p className="fs-2 text-center mt-4">
            The previous answer was {prevAnswer}.
          </p>
        </div>
      </div>
    </Fade>
  );
}

export default Game;
