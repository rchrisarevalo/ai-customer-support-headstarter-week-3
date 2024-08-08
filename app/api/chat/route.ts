import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { prompts } from "@/current_messages";

type ChatData = {
  chat_prompt: string
}

// Template included from Bill's video.
const POST = async (req: NextRequest) => {
  const data: ChatData = await req.json();

  // Set up Groq API.
  const groq = new Groq({
    apiKey: process.env.API_KEY
  })

  prompts.push({ role: 'user', content: data.chat_prompt })

  // Check if the prompt provided from the environment variable
  // is not null.
  if (process.env.GROQ_PROMPT) {
    // Get the chat completion response.
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: process.env.GROQ_PROMPT },
      ],
      model: 'llama3-8b-8192'
    })

    return NextResponse.json({
      message: chatCompletion.choices[0].message.content,
      user_type: "Bot"
    })
  } else {
    return NextResponse.json({
      message: "There was an error",
      user_type: "Bot"
    })
  }
};

export { POST };
