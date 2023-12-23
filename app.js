import account from "./api/account.js";
import credit from "./api/credit.js";
import express from "express";
import dotenv from "dotenv";
import oracledb from "oracledb";

const app = express();
const port = 3000;

// .env
dotenv.config();

// Oracle Cloud Database pool
// Application connections sourced from this pool
let pool = await oracledb.createPool({
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectionString: process.env.CONNECTION_STRING,
});

// output format for Oracle queries
oracledb.outFormat = oracledb.OBJECT;

// routes
app.use("/api/account", account);
app.use("/api/credit", credit);

var server = app.listen(port, () => {
  console.log(`Sitchensis is listening on port ${port}...`);
});

process.on("SIGTERM", () => {
  server.close(async () => {
    try {
      console.log("Sitchensis is shutting down ...");
      await oracledb.getPool().close(0);
      console.log("... done. Goodbye!");
    } catch (e) {
      throw e;
    }
  });
});

export default pool;
