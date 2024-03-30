const { Schema, model } = require("mongoose");
const { Types } = Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  tags: [String],
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Blog", BlogSchema);
