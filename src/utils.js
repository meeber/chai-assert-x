// Return an array containing the names of the given function's arguments, with
// all white space and comments removed.
function getFnArgs (fn) {
  return fn
  .toString()
  .match(/function\s.*?\(([^)]*)\)/)[1]
  .split(", ")
  .map(arg => arg.replace(/\/\*.*\*\//, "").trim())
}

// Relocate the first element to the end of the array unless the last element
// is "msg" in which case relocate it to the second-to-last index instead. A
// copy of the array is returned; the original is not modified.
function swapArgs (oldArgs) {
  let args = oldArgs.slice(0);
  let hasMsg = args[args.length - 1] === "msg";

  if (args.length < 2 || args.length === 2 && hasMsg) return args;

  let actual = args.shift();

  if (hasMsg) args.splice(-1, 0, actual);
  else args.push(actual);

  return args;
}

module.exports = {getFnArgs, swapArgs};
