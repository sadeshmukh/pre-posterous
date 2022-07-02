import React from "react";
import { Fade, Form, Button, Row, Col } from "react-bootstrap";
import Expression from "./expressionVisualizer";
import Case from "case";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import useSound from "use-sound";
import correctSound from "../Assets/correct.mp3";
import wrongSound from "../Assets/wrong.mp3";

function Game({ currentQuestion, hidden, nextQuestion, isEndless, endGame }) {
  // Current question comprises of the question, answer, number, and type (postfix/prefix/infix)

  const [userGuess, setUserGuess] = React.useState("");
  const [prevAnswer, setPrevAnswer] = React.useState(null);
  // Three possible states: incorrect, correct, ready
  const [validationState, setValidationState] = React.useState("ready");
  const [playCorrectSound] = useSound(correctSound);
  const [playWrongSound] = useSound(wrongSound);

  function validateAnswer(event) {
    setUserGuess("");
    if (validationState === "correct") {
      setValidationState("ready");
      setPrevAnswer(null);
      nextQuestion();
    } else if (parseInt(userGuess) === currentQuestion.answer) {
      setValidationState("correct");
      playCorrectSound();
    } else {
      setValidationState("incorrect");
      playWrongSound();
    }
    event.preventDefault();
  }

  return (
    <Fade in={!hidden}>
      <div hidden={hidden}>
        <Button
          className="float-end py-2 fs-4"
          variant="danger"
          onClick={endGame}
        >
          End Game
        </Button>
        <h1>{Case.capital(currentQuestion.type)} Game</h1>
        <Row className="text-center">
          <Col sm={12} className="mx-auto" md={12}>
            <Expression expression={currentQuestion.question} />
          </Col>
        </Row>

        <Form onSubmit={validateAnswer}>
          <div>
            <Row className="mt-5">
              <Col
                xs={{ span: 2, offset: 2 }}
                className="text-center align-middle"
              >
                <div className="align-middle inline-block">
                  <Fade
                    in={validationState === "incorrect"}
                    className="align-middle"
                  >
                    <div hidden={validationState !== "incorrect"}>
                      <ClearIcon />{" "}
                      <span className="align-middle fs-4">Incorrect.</span>
                    </div>
                  </Fade>
                  <Fade in={validationState === "correct"}>
                    <div
                      hidden={validationState !== "correct"}
                      className="align-middle"
                    >
                      <DoneIcon />{" "}
                      <span className="align-middle fs-4">Correct!</span>
                    </div>
                  </Fade>
                </div>
              </Col>
              <Col xs={4}>
                <Form.Control
                  type="number"
                  placeholder="Answer here"
                  value={userGuess}
                  onChange={(event) => setUserGuess(event.target.value)}
                  className="py-2 fs-1 user-input"
                />
              </Col>
              <Col xs={2}> </Col>
              <Col xs={1}></Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col xs={1}>
                <Button
                  type="submit"
                  variant="success"
                  className="mx-auto py-2 fs-3 me-3"
                  hidden={validationState === "correct"}
                >
                  Submit
                </Button>
                <Button
                  variant="success"
                  className="mx-auto py-2 fs-3 me-3"
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
                      className="ms-3 py-2 fs-3 mx-auto"
                      variant="secondary"
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
