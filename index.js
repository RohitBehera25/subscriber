const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12723364",
  password: "7SwZBdDd7q",
  database: "sql12723364",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "beherarohit752@gmail.com",
  auth: {
    user: "beherarohit752@gmail.com",
    pass: "atiz jsyv lmpk eyke",
  },
});

app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT * FROM subscribers WHERE email = ?",
    [email],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        return res.json({ message: "You are already subscribed!" });
      }
      db.query("INSERT INTO subscribers (email) VALUES (?)", [email], (err) => {
        if (err) throw err;
        const mailOptions = {
          from: "beherarohit752@gmail.com",
          to: "beherarohit752@gmail.com",

          text: "Thank you for subscribing!",
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) console.log(err);
          res.json({ message: "Thank you for subscribing!" });
        });
      });
    }
  );
});

app.post("/unsubscribe", (req, res) => {
  const { email } = req.body;

  db.query("DELETE FROM subscribers WHERE email = ?", [email], (err) => {
    if (err) throw err;
    const mailOptions = {
      from: "beherarohit752@gmail.com",
      to: "beherarohit752@gmail.com",

      text: "Sorry to see you go. You have been unsubscribed.",
    };
    transporter.sendMail(mailOptions, (err) => {
      if (err) console.log(err);
      res.json({ message: "You have been unsubscribed." });
    });
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
