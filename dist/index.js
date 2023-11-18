"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferedLogger = void 0;
class BufferedLogger {
    constructor(bufferSize = 10) {
        this.buffer = [];
        this.bufferSize = bufferSize;
    }
    log(message) {
        this.buffer.push(message);
        if (this.buffer.length >= this.bufferSize) {
            this.flush();
        }
    }
    flush(delay = 500) {
        setInterval(() => {
            this.buffer.forEach((log) => {
                console.log(log);
            });
            this.buffer.length = 0;
        }, delay);
    }
}
exports.BufferedLogger = BufferedLogger;
//# sourceMappingURL=index.js.map