"use client";
import React, { useEffect, useState } from "react";
import { ChatBotMessage, MessageDashboard, UserMessage } from "./Dashboard";
import { Loading } from "./Loading";

type ChatBotRes = {
  message: string;
  user_type: string;
};

const ChatBotUI = () => {
  const [chatInput, setChatInput] = useState<string>("");
  const [responses, setResponses] = useState<ChatBotRes[]>([
    {
      message:
        "I am a customer support chat bot, and I am ready to help you out! Do you have any questions?",
      user_type: "Bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChatSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setResponses([
      ...responses,
      {
        message: chatInput,
        user_type: "User",
      },
    ]);

    setIsLoading(true);

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
        const data: ChatBotRes = await res.json();
        console.log(data);

        setTimeout(() => {
          setResponses((prev) => {
            const oldData = prev;
            return [...oldData, data];
          });
          setIsLoading(false);
        }, 3000);

        // Clear the prompt from the input box.
        setChatInput("");
      }
    } catch {
      throw new Error("Failed to submit chat.");
    }
  };

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  return (
    <div className="flex flex-col item-center bg-slate-200 justify-center gap-5 text-left ml-36 mr-36 w-4/5 mt-20 mb-20 max-sm:ml-2 max-sm:mr-2 p-32 max-sm:p-12 rounded-2xl">
      <h1 className="font-extrabold text-3xl max-sm:text-2xl">
        Customer Support Chatbot
      </h1>
      <MessageDashboard>
        <>
          {responses.map((res, i) => (
            <span key={i}>
              {res.user_type == "Bot" && (
                <ChatBotMessage message={res.message} isLoading={false} />
              )}
              {res.user_type == "User" && <UserMessage message={res.message} />}
            </span>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Loading isLoading={isLoading} />
            </div>
          )}
        </>
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
