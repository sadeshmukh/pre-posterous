import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import cryptoRandomString from "crypto-random-string";

// Takes in collapsed expression array
function Expression({ expression, className = "" }) {
  return (
    <Container fluid className={className}>
      <Row className="explain-expression-row">
        {expression.map((symbol, index) => (
          <Col
            key={cryptoRandomString({ length: 10 })}
            className={
              "bg-light m-2 border-dark " +
              (index === 0 ? "rounded-start" : "") +
              (index === expression.length - 1 ? "rounded-end" : "")
            }
          >
            <p className="fs-1 align-midddle my-auto inline text-center">
              {symbol}
            </p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Expression;
