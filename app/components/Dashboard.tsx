import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Image from "next/image";
import chatbot_img from "../images/bot-ai-generated-img.jpg";
import user_img from "../images/user-ai-generated-img.jpg";
import { Loading } from "./Loading";
import Groq from "groq-sdk";

interface ChatBotMessageDisplayProps {
  message: string | null | undefined;
  index: number;
}

interface UserMessageDisplayProps {
  message: string | Groq.Chat.Completions.ChatCompletionContentPart[];
}

interface DashboardProps {
  children: React.ReactNode;
}

// Create a fixed date and time string identifier
// to keep track of when the session started.
//
// This will be used to store the feedback in the
// database from the current session.
//
// NOTE: This identifier will reset each time the page
// is refreshed.
const date_identifier = `${
  new Date().getMonth() + 1
}${new Date().getDate()}${new Date().getFullYear()}-${new Date().getTime()}`;

export const ChatBotMessage: React.FC<
  ChatBotMessageDisplayProps & { isLoading: boolean }
> = ({ message, index, isLoading }) => {
  const [feedback, setFeedback] = useState<null | "up" | "down">(null);

  const handleFeedback = async (type: "up" | "down") => {
    // Create a local variable to store the feedback
    // type.
    let feedback_type: string | null = "";

    // If the feedback provided is the same
    // provided as the one in the state
    // variable, then set both of them
    // to null.
    if (feedback == type) {
      feedback_type = null;
      setFeedback(null);
    } 
    // Otherwise, set it to the given feedback
    // type provided by the user.
    else {
      feedback_type = type;
      setFeedback(type);
    }

    try {
      // Store the feedback in the database.
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          rating:
            feedback_type == "up"
              ? "positive"
              : feedback_type == "down"
              ? "negative"
              : null,
          response: message,
          identifier: date_identifier,
          index_loc: index,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Print a message if the request was successful.
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        
      } else {
        console.error("Response failed to be retrieved.");
      }
    } catch {
      throw new Error("Feedback failed to be submitted.");
    }
  };

  return (
    <div className="flex flex-row gap-5 items-center text-left">
      <div className="flex items-center">
        <Image
          src={chatbot_img}
          alt="chatbot-ai-generated"
          className="w-12 h-12 rounded-full pointer-events-none"
        />
      </div>
      {isLoading ? (
        <div className="flex items-center">
          <Loading isLoading={isLoading} />
        </div>
      ) : (
        <div className="p-3 w-fit max-w-3/5 max-sm:w-3/4 bg-slate-100 text-black rounded-md relative">
          <p className=" max-sm:mr-0">
            {message?.split("\n").map((par, i) => (
              <span key={`par-${i}`} className="flex flex-col gap-4">
                {par}
              </span>
            ))}
          </p>

          <div className="absolute mt-4 flex items-center gap-2">
            <button
              onClick={() => handleFeedback("up")}
              className={`p-1 rounded-full ${
                feedback === "up" ? "bg-teal-600 text-white" : "text-gray-400"
              }`}
            >
              <FaThumbsUp size={12} />
            </button>
            <button
              onClick={() => handleFeedback("down")}
              className={`p-1 rounded-full ${
                feedback === "down" ? "bg-red-500 text-white" : "text-gray-400"
              }`}
            >
              <FaThumbsDown size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const UserMessage: React.FC<UserMessageDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-row justify-end items-end max-sm:items-end gap-5 text-left">
      <div className="p-3 max-w-3/5 w-fit max-sm:w-3/4 bg-slate-500 text-white rounded-md">
        <p className=" max-sm:mr-0">
          {message
            ?.toString()
            .split("\n")
            .map((par, i) => (
              <span key={`par-${i}`} className="flex flex-col gap-4">
                {par}
              </span>
            ))}
        </p>
      </div>
      <div className="flex flex-row items-center">
        <Image
          src={user_img}
          alt="user-ai-generated"
          className="w-12 h-12 rounded-full pointer-events-none"
        />
      </div>
    </div>
  );
};

export const MessageDashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div
      id="chatbot-dashboard"
      className="flex flex-col w-full h-96 overflow-y-auto p-10 max-sm:p-5 gap-5 max-lg:ml-10 max-lg:mr-10 max-sm:ml-0 max-sm:mr-0 max-sm:py-5 rounded-md bg-white text-black"
    >
      {children}
    </div>
  );
};