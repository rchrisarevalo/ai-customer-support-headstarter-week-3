"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChatBotMessage, MessageDashboard, UserMessage } from "./Dashboard";
import { Loading } from "./Loading";
import Groq from "groq-sdk";
import { IoIosSend } from "react-icons/io";

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
      role: "system",
      content: systemPrompt(),
    },
    {
      role: "assistant",
      content: "Hello! How can I help you?"
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [responses, isLoading]); // Scroll when responses change or when loading status changes.

  const handleChatSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Push response from user to array instead of setting it.
    // It helps boost its chances of making it to the server.
    responses.push({ role: 'user', content: chatInput })

    // Set the loading status to true to display
    // the loading animation while the chatbot
    // is thinking of a response.
    setIsLoading(true);

    // Clear the prompt from the input box.
    setChatInput("");

    try {
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

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline behavior
      handleChatSubmission(e); // Call the submit handler
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-300 text-left max-lg:w-4/5 max-sm:w-full max-sm:ml-2 max-sm:mr-2 p-8 max-sm:p-3 mx-auto">
      <div className="flex-grow overflow-y-auto p-6 w-full">
        <MessageDashboard>
          <>
            {responses.map((res, i) => (
              <span key={i}>
                {res.role == "assistant" && (
                  <ChatBotMessage message={res?.content} isLoading={false} index={i} />
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
        <div className="w-full mt-5 bg-transparent rounded-md">
          <form
            onSubmit={handleChatSubmission}
            className="flex flex-row max-sm:flex-col items-center justify-center text-left rounded-md w-full"
          >
            <textarea
              className="border-transparent outline-transparent bg-white mr-4 p-4 rounded-md resize-none w-full"
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={chatInput}
              rows={1}
              required
              placeholder="Message Chatbot"
            />
            <button
            type="submit"
            className={`p-6 py-3 text-3xl rounded-md ${chatInput == "" ? "bg-slate-100 hover:cursor-default" : "bg-slate-500 hover:bg-slate-400"} text-white font-extrabold`}
            >
              <IoIosSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;