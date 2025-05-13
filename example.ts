import { BufferedLogger } from ".";
import fs from "fs";

const logger = new BufferedLogger({
  bufferSize: 5,
  isWorker: true,
  customFlush: (buffer: string[]) => {
    console.log(buffer);
    // if new run, create new file
    if (!fs.existsSync("./log.txt")) {
      fs.writeFileSync("./log.txt", "");
    }
    fs.appendFileSync("./log.txt", buffer.join("\n"));
    fs.appendFileSync("./log.txt", "\n");
    buffer.length = 0;
  },
});

logger.log("Log entry 1");
logger.log("Log entry 2");
logger.log("Log entry 3");

logger.log("Log entry 4");
logger.log("Log entry 5");

logger.log("Log entry 6");
logger.log("Log entry 7");

logger.flush();

logger.log("Log entry 1");
logger.log("Log entry 2");
logger.log("Log entry 3");

logger.log("Log entry 4");
logger.log("Log entry 5");

setTimeout(() => {
  logger.log("Log entry 6");
  logger.log("Log entry 7");

  logger.log("Log entry 1");
  logger.log("Log entry 2");
  logger.log("Log entry 3");

  logger.log("Log entry 4");
  logger.log("Log entry 5");

  logger.log("Log entry 6");
  logger.log("Log entry 7");
}, 1000);
