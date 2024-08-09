"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChatBotMessage, MessageDashboard, UserMessage } from "./Dashboard";
import { Loading } from "./Loading";
import Groq from "groq-sdk";

type ChatBotRes = {
  role: string;
  content: string;
};

// Function that checks whether
// the AI prompt is undefined.
const systemPrompt = () => {
  if (process.env.GROQ_PROMPT) {
      return process.env.GROQ_PROMPT
  } else {
      return "undefined"
  }
}

const ChatBotUI = () => {
  const [chatInput, setChatInput] = useState<string>("");
  const [responses, setResponses] = useState<Groq.Chat.Completions.ChatCompletionMessageParam[]>([
    {
      role: "assistant",
      content: systemPrompt(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("Responses changed!")
    scrollToBottom();
  }, [responses, isLoading]); // Scroll when responses change or when loading status changes.

  const handleChatSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Push response from user to array instead of setting it.
    // It helps boost its chances of making it to the server.
    responses.push({role: 'user', content: chatInput})

    // Set the loading status to true to display
    // the loading animation while the chatbot
    // is thinking of a response.
    setIsLoading(true);

    // Clear the prompt from the input box.
    setChatInput("");

    try {
      console.log(responses)
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(responses),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        
        setTimeout(() => {
          // Push the response from the chatbot
          // into the responses array.
          responses.push(data)

          // Set the loading state to false
          // to no longer display loading
          // animation.
          setIsLoading(false);
        }, 3000)

        // Clear the prompt from the input box.
        setChatInput("")
      } else {
        const data = await res.json()

        setTimeout(() => {
          responses.push(data)
          setIsLoading(false);
        }, 3000)
      }
    } catch {
      throw new Error("Failed to submit chat.");
    }
  };

  return (
    <div className="flex flex-col item-center bg-slate-200 justify-center gap-5 text-left ml-36 mr-36 max-lg:w-4/5 max-sm:w-full mt-20 mb-20 max-sm:ml-2 max-sm:mr-2 p-32 max-sm:p-12 rounded-2xl">
      <h1 className="font-extrabold text-3xl max-sm:text-2xl">
        Customer Support Chatbot
      </h1>
      <div className="overflow-hidden h-full">
        <MessageDashboard>
          <>
            {responses.map((res, i) => (
              <span key={i}>
                {res.role == "assistant" && (
                  <ChatBotMessage message={res?.content} isLoading={false} />
                )}
                {res.role == "user" && (
                  <UserMessage message={res?.content} />
                )}
              </span>
            ))}
            <div ref={messageEndRef} />{" "}
            {/* Reference for message dashboard scrolling */}
            {isLoading && (
              <div className="flex justify-start">
                <Loading isLoading={isLoading} />
              </div>
            )}
          </>
        </MessageDashboard>
      </div>
      <form
        onSubmit={handleChatSubmission}
        className="flex flex-row max-sm:flex-col items-center justify-center gap-10 text-left rounded-md"
      >
        <textarea
          className="border-transparent pb-4 bg-white outline-transparent p-4 items-center rounded-md resize-none w-full"
          onChange={(e) => setChatInput(e.target.value)}
          value={chatInput}
          rows={1}
          required
        ></textarea>
        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="p-8 py-3 rounded-md bg-slate-500 text-white font-extrabold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBotUI;
