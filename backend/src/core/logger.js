/**
 * Creates a logger object that includes the caller's filename in log messages.
 *
 * Extracts the filename from the call stack and returns a logger with three methods
 * for different log levels. Each log message is prefixed with the caller's filename
 * and the log level.
 *
 * @returns {Console} Logger object with methods for different log levels
 *
 * @example
 * const logger = createLoggerInternal();
 * logger.info("Application started");
 * // Output: [filename.js - INFO]: Application started
 */
function createLoggerInternal() {
  const stack = new Error().stack.split("\n");
  const filename = stack[3].split("/").pop().split(":")[0];
  return {
    ...console,
    info: (message, ...optionalParams) => {
      console.info(`[${filename} - INFO]: ${message}`, ...optionalParams);
    },
    warn: (message, ...optionalParams) => {
      console.warn(`[${filename} - WARN]: ${message}`, ...optionalParams);
    },
    error: (message, ...optionalParams) => {
      console.error(`[${filename} - ERROR]: ${message}`, ...optionalParams);
    },
    log: (message, ...optionalParams) => {
      console.log(`[${filename} - LOG]: ${message}`, ...optionalParams);
    },
    debug: process.env["DEBUG"]
      ? (message, ...optionalParams) => {
          console.log(`[${filename} - DEBUG]: ${message}`, ...optionalParams);
        }
      : () => {},
  };
}

/**
 * Proxy logger that creates a new logger instance for each property access.
 * This ensures that the caller's filename is correctly captured in log messages.
 * @type {Console}
 */
export const logger = new Proxy(
  {},
  {
    get(_target, prop) {
      const loggerInstance = createLoggerInternal();
      return loggerInstance[prop].bind(loggerInstance);
    },
  },
);
