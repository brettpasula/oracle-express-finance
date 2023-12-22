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

app.use("/api/account", account);
app.use("/api/credit", credit);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on('SIGTERM', () => {

});

export default pool;
