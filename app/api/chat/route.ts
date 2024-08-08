import { NextRequest, NextResponse } from "next/server";
import groq from "@/setup";

type ChatData = {
  chat_prompt: string;
};

// Template included from Bill's video.
const POST = async (req: NextRequest) => {
  const data: ChatData = await req.json();

  // Check if the prompt provided from the environment variable
  // is not null.
  if (process.env.GROQ_PROMPT) {
    // Get the chat completion response.
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: process.env.GROQ_PROMPT },
        { role: "user", content: data.chat_prompt },
      ],
      model: "llama3-8b-8192",
    });

    return NextResponse.json({
      message: chatCompletion.choices[0].message.content,
      user_type: "Bot",
    });
  } else {
    return NextResponse.json({
      message: "There was an error",
      user_type: "Bot",
    });
  }
};

export { POST };
