const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const NotesModel = model("notes", NotesSchema);
module.exports = NotesModel;
