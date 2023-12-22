import express from "express";
import pool from "../app.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(`SELECT id, name FROM account`);
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
