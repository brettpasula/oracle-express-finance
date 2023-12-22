import express from "express";
import pool from "../app.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(`SELECT
    C.ID,
    A.NAME,
    C.CREDIT_AVAILABLE,
    C.CREDIT_LIMIT,
    C.ANNUAL_FEE,
    C.REWARDS_PROGRAM_DETAILS,
    C.LAST_STATEMENT_DUE_DATE,
    C.LAST_STATEMENT_BALANCE,
    C.LAST_PAYMENT_DATE
FROM
         ACCOUNT A
    JOIN CREDIT C ON C.ACCOUNT_ID = A.ID`);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection)
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
  }
});

export default router;