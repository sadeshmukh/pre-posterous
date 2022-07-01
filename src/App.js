import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import {
  generatePrefix,
  generatePostfix,
  collapseArray,
} from "./expressionGenerator";

function App() {
  return (
    <div className="App">
      {console.log(collapseArray(3, generatePrefix(3)))}
    </div>
  );
}

export default App;
