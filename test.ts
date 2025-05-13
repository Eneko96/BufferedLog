import { test, beforeEach } from "node:test";
import assert from "node:assert";
import { BufferedLogger } from ".";

// Mock Worker for Node.js environment
global.Worker = class {
  postMessage(msg: string) {
    this.receivedMessages.push(msg);
  }
  terminate() {}
  receivedMessages: string[] = [];
} as any;

let logger: BufferedLogger;

// Reset logger before each test
beforeEach(() => {
  logger = new BufferedLogger({ bufferSize: 3 });
});

test("BufferedLogger should flush automatically when bufferSize is reached", () => {
  logger.log("Message 1");
  logger.log("Message 2");
  logger.log("Message 3");

  assert.strictEqual(
    logger["buffer"].length,
    0,
    "Buffer should be flushed when full",
  );
});

test("BufferedLogger should correctly use a custom flush function", () => {
  let flushedBuffer: string[] = [];
  const customLogger = new BufferedLogger({
    bufferSize: 2,
    customFlush: (buffer) => {
      flushedBuffer = [...buffer];
    },
  });

  customLogger.log("Custom 1");
  customLogger.log("Custom 2");

  assert.deepStrictEqual(
    flushedBuffer,
    ["Custom 1", "Custom 2"],
    "Custom flush should receive the correct buffer",
  );
  assert.strictEqual(
    customLogger["buffer"].length,
    0,
    "Buffer should be cleared after custom flush",
  );
});

test("BufferedLogger should send messages to a worker if isWorker is true", () => {
  const workerLogger = new BufferedLogger({ bufferSize: 2, isWorker: true });
  workerLogger.log("Worker 1");
  workerLogger.log("Worker 2");

  const worker = workerLogger["worker"] as any;
  assert(worker, "Worker should be initialized");
  assert.deepStrictEqual(
    worker.receivedMessages,
    ["Worker 1", "Worker 2"],
    "Worker should receive the messages",
  );
});

test("BufferedLogger should not flush before reaching bufferSize", () => {
  logger.log("Msg 1");
  logger.log("Msg 2");

  assert.strictEqual(
    logger["buffer"].length,
    2,
    "Buffer should hold messages until full",
  );
});

test("BufferedLogger should properly dispose of the worker", () => {
  const workerLogger = new BufferedLogger({ isWorker: true });

  assert(
    workerLogger["worker"],
    "Worker should be initialized before disposing",
  );
  workerLogger.dispose();
  assert.strictEqual(
    workerLogger["worker"],
    null,
    "Worker should be null after dispose",
  );
});

console.log("All tests passed!");
