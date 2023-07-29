const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const Note = require("./models/Notes");
const app = express();
app.use(cors());

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("test ok");
});
app.post("/api/note", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { title, content } = req.body;
  res.json(await Note.create({ title, content }));
});

app.get("/api/notes", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  res.json(await Note.find({}));
});

app.delete("/api/delete/:id", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  res.json(await Note.deleteOne({_id:req.params.id}));
});

app.listen(process.env.PORT || 3001, (req, res) => {
  console.log("ServerUp");
});
