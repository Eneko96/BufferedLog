export class BufferedLogger {
  private buffer: string[] = [];
  private bufferSize: number;
  private isWorker: boolean;
  private worker: Worker | null = null;
  private customFlush: ((buffer: string[]) => void) | null;

  constructor({
    bufferSize = 10,
    isWorker = false,
    customFlush,
  }: {
    bufferSize?: number;
    isWorker?: boolean;
    customFlush?: (buffer: string[]) => void;
  }) {
    this.bufferSize = bufferSize;
    this.isWorker = isWorker;
    this.customFlush = customFlush;

    if (isWorker && typeof Worker !== "undefined") {
      try {
        this.worker = new Worker("./worker.js");
      } catch (err) {
        console.error("Failed to initialise worker:", err);
      }
    }
  }

  log(message: string) {
    this.buffer.push(message);

    if (this.buffer.length >= this.bufferSize) {
      this.flush();
    }
  }

  flush() {
    if (this.customFlush) {
      this.customFlush(this.buffer);
      return;
    } else if (this.isWorker && this.worker) {
      for (const message of this.buffer) {
        this.worker.postMessage(message);
      }
    } else {
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
