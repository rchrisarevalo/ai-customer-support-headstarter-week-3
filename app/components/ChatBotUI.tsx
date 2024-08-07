"use client";
import React, { useState } from "react";
import { ChatBotMessage, MessageDashboard, UserMessage } from "./Dashboard";

const ChatBotUI = () => {
  const [chatInput, setChatInput] = useState<string>("");

  const handleChatSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          chat_prompt: chatInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        
        // Clear the prompt from the input box.
        setChatInput("")

        console.log(data);
      }
    } catch {
      throw new Error("Failed to submit chat.");
    }
  };

  return (
    <div className="flex flex-col item-center bg-slate-200 justify-center gap-5 text-left ml-36 mr-36 w-4/5 mt-20 mb-20 max-sm:ml-4 max-sm:mr-4 p-32 max-sm:p-12 rounded-2xl">
      <h1 className="font-extrabold text-3xl max-sm:text-2xl">
        Customer Support Chatbot
      </h1>
      <MessageDashboard>
        <ChatBotMessage message="I am a dumb bot. What else do you expect from me?" />
        <UserMessage message="Not much. You are a dumb bot after all." />
        <ChatBotMessage message="Wow, that was insulting." />
        <UserMessage message="Well, it's not entirely surprising." />
        <ChatBotMessage message="Tell me, how can I do better in providing more intelligent responses than the ones I am providing?" />
      </MessageDashboard>
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
