import { BufferedLogger } from ".";

const logger = new BufferedLogger(5);

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

logger.log("Log entry 6");
logger.log("Log entry 7");

logger.log("Log entry 1");
logger.log("Log entry 2");
logger.log("Log entry 3");

logger.log("Log entry 4");
logger.log("Log entry 5");

logger.log("Log entry 6");
logger.log("Log entry 7");
