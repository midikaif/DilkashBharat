const mongoose = require("mongoose");
const Reviews = require('./reviews.model');


const Places = new mongoose.Schema(
  {
    title: String,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [
      {
        url: String,
        filename: String,
      },
    ],
    description: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
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

Places.post('findOneAndDelete', async function(data){
  if(data){
    await Reviews.deleteMany({
      _id:{
        $in: data.reviews
      }
    })
  }
})


module.exports = mongoose.model("places", Places);
