/*
 * This line is important in "tricking" the typescript compiler into keeping your
 * files in a module scope. Without it, typescript will assume all variables defined
 * in files are global and will fail compilation if you "redefine" them in multiple files.
 */
export { };

/*
 * unfortunately, you can't use the lovely ES6 modules here, instead we're back to node-style
 * require statements. Ah well, at least you get types goodness!
 */
const greeting = require('./task/greet');

onmessage = () => {
    postMessage(greeting());
};
