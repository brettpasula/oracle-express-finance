import account from "./api/account.js";
import credit from "./api/credit.js";
import express from "express";
import dotenv from "dotenv";
import oracledb from "oracledb";

const app = express();
const port = 3000;

dotenv.config();

let pool = await oracledb.createPool({
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectionString: process.env.CONNECTION_STRING,
});

oracledb.outFormat = oracledb.OBJECT;

app.use("/api/account", account);
app.use("/api/credit", credit);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
