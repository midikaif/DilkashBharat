const mongoose = require("mongoose");

const Places = new mongoose.Schema(
  {
    title: String,
    location: String,
    description: String,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("places", Places);
