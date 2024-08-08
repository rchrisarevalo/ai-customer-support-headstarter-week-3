import { NextRequest, NextResponse } from "next/server";

type ChatData = {
  chat_prompt: string
}

// Template included from Bill's video.
const POST = async (req: NextRequest) => {
  const data: ChatData = await req.json();

  // Dumb chatbot pre-configured responses.
  if (data.chat_prompt == "Hi" || data.chat_prompt == "Hello") {
    return NextResponse.json({
      message: "Hello! I am a chatbot ready to assist you.",
      user_type: "Bot",
    });
  } else if (data.chat_prompt == "You're awesome!" || data.chat_prompt == "You are awesome!") {
    return NextResponse.json({
      message: "Thank you! You're awesome too.",
      user_type: "Bot",
    });
  } else if (data.chat_prompt.toLowerCase() == "How are you doing?".toLowerCase()) {
    return NextResponse.json({
      message: "I am doing great! How can I assist you today?",
      user_type: "Bot"
    });
  } else if (data.chat_prompt.toLowerCase() == "What is 2+2?".toLowerCase()) {
    return NextResponse.json({
      message: "Fish! *rim shot*",
      user_type: "Bot"
    });
  } else {
    return NextResponse.json({
      message:
        "I am sorry, but I don't have the answer to that question or response. Try again later.",
      user_type: "Bot",
    });
  }
};

export { POST };
