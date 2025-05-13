"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const _1 = require(".");
// Mock Worker for Node.js environment
global.Worker = class {
    constructor() {
        this.receivedMessages = [];
    }
    postMessage(msg) {
        this.receivedMessages.push(msg);
    }
    terminate() { }
};
let logger;
// Reset logger before each test
(0, node_test_1.beforeEach)(() => {
    logger = new _1.BufferedLogger({ bufferSize: 3 });
});
(0, node_test_1.test)("BufferedLogger should flush automatically when bufferSize is reached", () => {
    logger.log("Message 1");
    logger.log("Message 2");
    logger.log("Message 3");
    node_assert_1.default.strictEqual(logger["buffer"].length, 0, "Buffer should be flushed when full");
});
(0, node_test_1.test)("BufferedLogger should correctly use a custom flush function", () => {
    let flushedBuffer = [];
    const customLogger = new _1.BufferedLogger({
        bufferSize: 2,
        customFlush: (buffer) => {
            flushedBuffer = [...buffer];
        },
    });
    customLogger.log("Custom 1");
    customLogger.log("Custom 2");
    node_assert_1.default.deepStrictEqual(flushedBuffer, ["Custom 1", "Custom 2"], "Custom flush should receive the correct buffer");
    node_assert_1.default.strictEqual(customLogger["buffer"].length, 0, "Buffer should be cleared after custom flush");
});
(0, node_test_1.test)("BufferedLogger should send messages to a worker if isWorker is true", () => {
    const workerLogger = new _1.BufferedLogger({ bufferSize: 2, isWorker: true });
    workerLogger.log("Worker 1");
    workerLogger.log("Worker 2");
    const worker = workerLogger["worker"];
    (0, node_assert_1.default)(worker, "Worker should be initialized");
    node_assert_1.default.deepStrictEqual(worker.receivedMessages, ["Worker 1", "Worker 2"], "Worker should receive the messages");
});
(0, node_test_1.test)("BufferedLogger should not flush before reaching bufferSize", () => {
    logger.log("Msg 1");
    logger.log("Msg 2");
    node_assert_1.default.strictEqual(logger["buffer"].length, 2, "Buffer should hold messages until full");
});
(0, node_test_1.test)("BufferedLogger should properly dispose of the worker", () => {
    const workerLogger = new _1.BufferedLogger({ isWorker: true });
    (0, node_assert_1.default)(workerLogger["worker"], "Worker should be initialized before disposing");
    workerLogger.dispose();
    node_assert_1.default.strictEqual(workerLogger["worker"], null, "Worker should be null after dispose");
});
console.log("All tests passed!");
//# sourceMappingURL=test.js.map