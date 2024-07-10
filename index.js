require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const Book = require("./models/book");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.DB_HOST);
let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});
db.on("error", (err) => {
  console.log("DB Error:" + err);
});

app.get("/api/books", (req, res) => {
  Book.find({})
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      con