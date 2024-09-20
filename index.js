const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});

app.get('/student', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM react");
    res.status(200).send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Database query failed" });
  }
});

app.post('/create', async (req, res) => {
  const { email, name } = req.body;
  try {
    const [result] = await pool.query("INSERT INTO react (email,name) VALUES (?,?)", [email, name]);
    res.status(201).send("Record created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to insert data" });
  }
});

app.put('/update', async (req, res) => {
  const { id, email } = req.body;
  try {
    const [result] = await pool.query("UPDATE react SET email = ? WHERE id = ?", [email, id]);
    res.status(200).send("Record updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update data" });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("DELETE FROM react WHERE id = ?", [id]);
    res.status(200).send("Record deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to delete data" });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
