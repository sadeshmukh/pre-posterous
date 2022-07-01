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

function randomNumber(min, max) {
  // Inclusive of min/max
  // Scale 0 - 1 to the range (max - min + 1), then add minimum
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePrefix(depth) {
  if (depth === 0) {
    return randomNumber(3, 20);
  } else {
    return [
      operatorList[Math.floor(Math.random() * operatorList.length)],
      generatePrefix(depth - 1),
      generatePrefix(depth - 1),
    ];
  }
}

function generatePostfix(depth) {
  if (depth === 0) {
    return randomNumber(3, 20);
  } else {
    return [
      generatePostfix(depth - 1),
      generatePostfix(depth - 1),
      operatorList[Math.floor(Math.random() * operatorList.length)],
    ];
  }
}

function collapseArray(depth, oldArray) {
  // Spread operator copies array
  let newArray = [...oldArray];
  // Repeat one less time than depth
  for (let i = 0; i < depth; i++) {
    newArray = [].concat(...newArray);
  }
  return newArray;
}

export { generatePrefix, generatePostfix, collapseArray };
