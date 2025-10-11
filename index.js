import { spawn } from "child_process";

/** @type {string} */
const backendDir = "backend";
/** @type {string} */
const frontendDir = "frontend";
/** @type {string | undefined} */
const commandArg = process.argv[2];
/** @type {Array<import('node:child_process').ChildProcess>} */
const childProcesses = [];

/**
 * Runs a given npm script command in the specified directory.
 *
 * @param {string} command
 * @param {string} cwd
 * @returns
 */
function runScript(command, cwd) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");
    const proc = spawn(cmd, args, { cwd });
    childProcesses.push(proc);
    proc.stdout?.on("data", (data) => {
      process.stdout.write(`[${cwd}] ${data}`);
    });
    proc.stderr?.on("data", (data) => {
      process.stderr.write(`[${cwd} ERROR] ${data}`);
    });
    proc.on("close", (code) => {
      console.log(`Process in ${cwd} exited with code ${code}`);
      if (code === 0) resolve();
      else reject(new Error(`Process in ${cwd} exited with code ${code}`));
    });
    proc.on("error", reject);
  });
}

/**
 * Cleans up all child processes on exit.
 *
 * @return {void}
 */
function cleanup() {
  console.log("Cleaning up child processes...");
  for (const proc of childProcesses) {
    if (!proc.killed) {
      proc.kill("SIGTERM");
      console.log(`Killed process with PID: ${proc.pid}`);
    }
  }
}

process.on("SIGINT", () => {
  cleanup();
  process.exit();
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit();
});

/**
 * Starts both backend and frontend npm scripts with the given command.
 *
 * @param {string} command
 */
async function startProjects(command) {
  try {
    await Promise.all([
      runScript(`npm run ${command}`, backendDir),
      runScript(`npm run ${command}`, frontendDir),
    ]);
    console.log("Both processes finished successfully.");
  } catch (err) {
    console.error("One of the processes failed:", err.message);
    process.exit(1);
  }
}

if (!commandArg) {
  console.error(
    'Please provide a command as an argument, e.g., "start" or "build".',
  );
  process.exit(1);
}

startProjects(commandArg);
