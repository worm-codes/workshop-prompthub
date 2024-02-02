import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
  },
  header: {
    type: String,
    required: [true, "Header is required!"],
  },
  tags: {
    type: [String],
    required: [true, "Tags are required!"],
  },
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
