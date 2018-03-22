/*
 * This class is in no-way a good example of how to manage Background Tasks
 * in Electron. It's purely here to show how client code can start up workers
 * that are written in Typescript.
 */
export default class BackgroundTasks {
    private worker: Worker;

    constructor() {
        /*
         * Load the workers/index file as if you were in index.html
         */
        this.worker = new Worker('./workers/index.js');
    }

    start() {
        window.setInterval(() => {
            this.worker.postMessage('greet');
        }, 1000);
    }

    onMessage(callback: (event: MessageEvent) => void): void {
        this.worker.onmessage = callback;
    }
}
