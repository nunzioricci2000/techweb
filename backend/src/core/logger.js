/**
 * Creates a console object that includes the caller's filename in log messages.
 *
 * Extracts the filename from the call stack and returns a console with three methods
 * for different log levels. Each log message is prefixed with the caller's filename
 * and the log level.
 *
 * @returns {Console} Logger object with methods for different log levels
 *
 * @example
 * const console = createLoggerInternal();
 * console.info("Application started");
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
 * Proxy console that creates a new console instance for each property access.
 * This ensures that the caller's filename is correctly captured in log messages.
 * @type {Console}
 */
export const console = new Proxy(
  {},
  {
    get(_target, prop) {
      const loggerInstance = createLoggerInternal();
      return loggerInstance[prop].bind(loggerInstance);
    },
  },
);
