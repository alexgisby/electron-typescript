/*
 * This line is important in "tricking" the typescript compiler into keeping your
 * files in a module scope. Without it, typescript will assume all variables defined
 * in files are global and will fail compilation if you "redefine" them in multiple files.
 */
export { };

const greetings = ['hello!', 'bonjour!', 'güten tag!'];
let i = 0;

/*
 * Unfortunately, you can't "export default" or "export function" from within workers if you
 * want them to compile into code that can run in a browser.
 *
 * As you can see though, we do have types! So it's not all bad! :)
 */
module.exports = (): string => {
    const greeting = greetings[i];
    i = i === greetings.length - 1? 0 : i + 1;
    return greeting;
};
