import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";
const port = 3000;

let server: Server;

const p = 5;

async function main() {
  try {
    await mongoose.connect(`${config.mongoDb_Uri}`);
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log("server error", err);
    throw Error("error at the server xxxxxx");
  }
}
main();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);

  // Gracefully shut down the server
  server.close(() => {
    console.log("Server closed due to an unhandled promise rejection.");
    process.exit(1); // Exit the process after closing the server
  });

  // Force exit if shutdown takes too long
  setTimeout(() => {
    console.error("Forcefully shutting down...");
    process.exit(1);
  }, 5000); // 5 seconds timeout
});

process.on("uncaughtException", err => {
  console.error("Unhandled Exception:", err);

  // Gracefully shut down the server
  server.close(() => {
    console.log("Server closed due to an uncaught exception.");
    process.exit(1); // Exit with a failure code
  });

  // Force exit if shutdown takes too long
  setTimeout(() => {
    console.error("Forcefully shutting down...");
    process.exit(1);
  }, 5000); // 5 seconds timeout
});
