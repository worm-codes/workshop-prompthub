import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
export const POST = async (req, res) => {
  const { prompt, header, userId, tags } = await req.json();
  try {
    await connectToDB();
  } catch (err) {
    console.log(err);
  }
  try {
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      header,
      tags,
    });
    try {
      const promptOwner = await User.findById(userId);
      promptOwner?.prompts.push(newPrompt._id);
      await promptOwner?.save();
    } catch (err) {
      console.log(err);
    }

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (err) {
    return new Response(err, {
      status: 500,
    });
  }
};
