export class BufferedLogger {
  private buffer: string[];
  private bufferSize: number;
  private isWorker: boolean;
  private worker: Worker | null;

  constructor(bufferSize = 10, isWorker = false) {
    this.buffer = [];
    this.bufferSize = bufferSize;
    if (isWorker && typeof Worker !== "undefined") {
      this.isWorker = isWorker;
      this.worker = new Worker("./worker.js");
    }
  }

  log(message: string) {
    this.buffer.push(message);

    if (this.buffer.length >= this.bufferSize) {
      this.flush();
    }
  }

  flush(delay = 500) {
    setInterval(() => {
      if (this.isWorker && this.worker && this.buffer.length > 0) {
        for (const message of this.buffer) {
          this.worker.postMessage(message);
        }
      } else {
        for (const message of this.buffer) {
          console.log(message);
        }
      }
      this.buffer = [];
    }, delay);
  }
}
