export class BufferedLogger {
  private buffer: string[];
  private bufferSize: number;

  constructor(bufferSize = 10) {
    this.buffer = [];
    this.bufferSize = bufferSize;
  }

  log(message: string) {
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
