import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Set up Groq API.
const groq = new Groq({
  apiKey: process.env.API_KEY
})

// Template included from Bill's video.
const POST = async (req: NextRequest) => {
  const data: Groq.Chat.Completions.ChatCompletionMessageParam[] = await req.json();

  try {
    // Check if the prompt provided from the environment variable
    // is not null.
    if (process.env.GROQ_PROMPT) {
      // Get the chat completion response.
      const chatCompletion = await groq.chat.completions.create({
        messages: data,
        model: "llama3-8b-8192",
      });

      return NextResponse.json({
        content: chatCompletion.choices[0].message.content,
        role: "assistant",
      });
    } else {
      return NextResponse.json({
        content: "There was an error",
        role: "assistant",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      content: "There was an error",
      role: "assistant",
    });
  }
};

export { POST };
