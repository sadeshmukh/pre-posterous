const operatorList = ["*", "+", "-"];
const operatorFunctions = {
  "*": (a, b) => parseInt(a) * parseInt(b),
  "/": (a, b) => parseInt(a) / parseInt(b),
  "+": (a, b) => parseInt(a) + parseInt(b),
  "-": (a, b) => parseInt(a) - parseInt(b),
};

const probabilityDefault = 0;
const minNumberDefault = 3;
const maxNumberDefault = 15;

const numbers = [];
for (let i = minNumberDefault; i <= maxNumberDefault; i++) {
  numbers.push(i);
}

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
  let symbolStack = [];

  function simplify(symbolStack) {
    while (symbolStack.length >= 3) {
      let [operator, leftOperand, rightOperand] = symbolStack.slice(-3);
      if (
        !operatorList.includes(operator) ||
        isNaN(leftOperand) ||
        isNaN(rightOperand)
      ) {
        break;
      }

      symbolStack.pop();
      symbolStack.pop();
      symbolStack.pop();
      symbolStack.push(operatorFunctions[operator](leftOperand, rightOperand));
    }
  }

  for (let token of prefixExpression) {
    symbolStack.push(token);
    simplify(symbolStack);
  }
  console.log(symbolStack);
  return symbolStack[0];
}

function solvePostfix(postfixExpression) {
  let numberStack = [];
  let newNumber;
  for (let i = 0; i < postfixExpression.length; i++) {
    if (!isNaN(postfixExpression[i])) {
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
