"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const logger = new _1.BufferedLogger(5, true);
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