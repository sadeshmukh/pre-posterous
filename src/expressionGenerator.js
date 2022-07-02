const numbers = [];
// Generates numbers 1 - 15
for (let i = 1; i <= 15 + 1; i++) {
  numbers.push(i);
}

const operatorList = ["*", "+", "-"];
const operatorFunctions = {
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
};

const probabilityDefault = 0;
const minNumberDefault = 3;
const maxNumberDefault = 15;

function randomNumber(min, max) {
  // Inclusive of min/max
  // Scale 0 - 1 to the range (max - min + 1), then add minimum
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collapseArray(depth, oldArray) {
  // Spread operator copies array
  let newArray = [...oldArray];
  // Repeat one less time than depth
  for (let i = 0; i < depth + 1; i++) {
    newArray = [].concat(...newArray);
  }
  return newArray;
}

function generatePrefix(
  depth,
  probability = probabilityDefault,
  minNumber = minNumberDefault,
  maxNumber = maxNumberDefault
) {
  if (depth === 0 || Math.random() * 100 <= probability) {
    return [randomNumber(minNumber, maxNumber)];
  } else {
    return collapseArray(depth, [
      operatorList[Math.floor(Math.random() * operatorList.length)],
      generatePrefix(depth - 1),
      generatePrefix(depth - 1),
    ]);
  }
}

function generatePostfix(
  depth,
  probability = probabilityDefault,
  minNumber = minNumberDefault,
  maxNumber = maxNumberDefault
) {
  if (depth === 0 || Math.random() * 100 <= probability) {
    return [randomNumber(minNumber, maxNumber)];
  } else {
    return collapseArray(depth, [
      generatePostfix(depth - 1),
      generatePostfix(depth - 1),
      operatorList[Math.floor(Math.random() * operatorList.length)],
    ]);
  }
}

// solvePrefix takes a valid collapsed prefix expression as input
function solvePrefix(prefixExpression) {
  let operatorStack = [];
  let currentNumber = null;
  for (let i = 0; i < prefixExpression.length; i++) {
    if (operatorList.includes(prefixExpression[i])) {
      operatorStack.push(prefixExpression[i]);
    } else {
      if (currentNumber === null) {
        currentNumber = prefixExpression[i];
      } else {
        // Looks up operator in functions, then sets the current number to the operation completed
        currentNumber = operatorFunctions[
          operatorStack[operatorStack.length - 1]
        ](currentNumber, prefixExpression[i]);
        // Removes operator from stack
        operatorStack.pop();
      }
    }
  }
  return currentNumber;
}

function solvePostfix(postfixExpression) {
  let numberStack = [];
  let newNumber;
  for (let i = 0; i < postfixExpression.length; i++) {
    if (numbers.includes(postfixExpression[i])) {
      numberStack.push(postfixExpression[i]);
    } else {
      newNumber = operatorFunctions[postfixExpression[i]](
        numberStack[numberStack.length - 2],
        numberStack[numberStack.length - 1]
      );
      numberStack.pop();
      numberStack.pop();
      numberStack.push(newNumber);
    }
  }
  return numberStack[0];
}

export { generatePrefix, generatePostfix, solvePrefix, solvePostfix };
