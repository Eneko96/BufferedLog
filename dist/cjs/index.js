"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferedLogger = void 0;
class BufferedLogger {
    constructor({ bufferSize = 10, isWorker = false, customFlush, }) {
        this.buffer = [];
        this.worker = null;
        this.bufferSize = bufferSize;
        this.isWorker = isWorker;
        this.customFlush = customFlush;
        if (isWorker && typeof Worker !== "undefined") {
            try {
                this.worker = new Worker("./worker.js");
            }
            catch (err) {
                console.error("Failed to initialise worker:", err);
            }
        }
    }
    log(message) {
        this.buffer.push(message);
        if (this.buffer.length >= this.bufferSize) {
            this.flush();
        }
    }
    flush() {
        if (this.customFlush) {
            this.customFlush(this.buffer);
            return;
        }
        else if (this.isWorker && this.worker) {
            for (const message of this.buffer) {
                this.worker.postMessage(message);
            }
        }
        else {
            this.buffer.forEach((message) => console.log(message));
        }
        this.buffer = [];
    }
    dispose() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }
}
exports.BufferedLogger = BufferedLogger;
//# sourceMappingURL=index.js.map