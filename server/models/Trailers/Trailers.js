import mongoose from "mongoose";
const trailerSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true
  },
  trailerUrl: {
    type: String,
    required: true
  }
})

const trailerModel = mongoose.model("trailers", trailerSchema, "trailers")

export default trailerModel