"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const fs_1 = __importDefault(require("fs"));
const logger = new _1.BufferedLogger({
    bufferSize: 5,
    isWorker: true,
    customFlush: (buffer) => {
        console.log(buffer);
        // if new run, create new file
        if (!fs_1.default.existsSync("./log.txt")) {
            fs_1.default.writeFileSync("./log.txt", "");
        }
        fs_1.default.appendFileSync("./log.txt", buffer.join("\n"));
        fs_1.default.appendFileSync("./log.txt", "\n");
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
//# sourceMappingURL=example.js.map