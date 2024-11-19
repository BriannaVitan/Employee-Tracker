import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const connecttodb = async () => {
  try {
    await pool.connect();
  } catch (error) {
    process.exit(1);
  }
};
export { pool, connecttodb };