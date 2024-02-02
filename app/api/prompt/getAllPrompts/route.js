import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();
  } catch (err) {
    console.log(err);
  }
  try {
    const prompts = await Prompt.find({})
      .populate("creator")
      .sort({ createdAt: -1 });
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(err, {
      status: 500,
    });
  }
};
