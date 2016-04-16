// If any arguments need to be swapped to achieve an expected-first assertion
// syntax for the given function, then return a function wrapper that accepts
// arguments in the swapped order and when called performs the necessary
// mapping to pass these arguments onto the original function. Otherwise, if no
// arguments need to be swapped, return the original function without a wrapper.
function createFnWrapper (fn) {
  let oldArgOrder = getArgOrder(fn);
  let newArgOrder = swapArgs(oldArgOrder);

  if (newArgOrder === oldArgOrder) return fn;

  let mapping = oldArgOrder.map(val => newArgOrder.indexOf(val));

  return (...params) => fn(...params.map((val, index) =>
    index >= mapping.length ? val : params[mapping[index]]
  ));
}

// Return an array containing the names of the given function's arguments in
// order, with all white space and comments removed.
function getArgOrder (fn) {
  return fn
  .toString()
  .match(/function\s.*?\(([^)]*)\)/)[1]
  .split(",")
  .map(arg => arg.replace(/\/\*.*\*\//, "").trim());
}

// Normal assertion syntax requires the first argument to be the actual value
// being tested, followed by zero or more expected/test values, followed by an
// optional msg value. To achieve expected-first syntax, the actual argument
// should be relocated to the end of the array if there's no msg argument, or to
// the second-to-last index if there is a msg argument. If any relocation
// occurs, then return a copy of the array without modifying the original.
// Otherwise return the original.
function swapArgs (oldArgOrder) {
  let newArgOrder = oldArgOrder.slice(0);
  let numArgs = newArgOrder.length;
  let hasMsg = newArgOrder[numArgs - 1] === "msg";

  if (numArgs < 2 || numArgs === 2 && hasMsg) return oldArgOrder;

  let actual = newArgOrder.shift();

  if (hasMsg) newArgOrder.splice(-1, 0, actual);
  else newArgOrder.push(actual);

  return newArgOrder;
}

module.exports = {createFnWrapper, getArgOrder, swapArgs};
