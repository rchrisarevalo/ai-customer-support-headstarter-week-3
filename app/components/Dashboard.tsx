import React from "react";
import Image from "next/image";
import chatbot_img from "../images/bot-ai-generated-img.jpg";
import user_img from "../images/user-ai-generated-img.jpg";
import { Loading } from "./Loading";
import Groq from "groq-sdk";

interface MessageDisplayProps {
  message: string | Groq.Chat.Completions.ChatCompletionContentPart[];
}

interface ChatBotMessageDisplayProps {
  message: string | null | undefined
}

interface UserMessageDisplayProps {
  message: string | Groq.Chat.Completions.ChatCompletionContentPart[]
}

interface DashboardProps {
  children: React.ReactNode;
}

export const ChatBotMessage: React.FC<ChatBotMessageDisplayProps & { isLoading: boolean }> = ({ message, isLoading }) => {
  return (
    <div className="flex flex-col gap-5 items-start text-left">
      {isLoading ? (
        <div className="flex items-center">
          <Loading isLoading={isLoading} />
        </div>
      ) : (
        <div className="p-2 w-3/5 max-sm:w-3/4 bg-slate-300 text-black rounded-md flex flex-row items-center justify-between">
          <Image
          src={chatbot_img}
          alt="chatbot-ai-generated"
          className="w-16 h-16 rounded-full pointer-events-none p-2"
          />
          <p className="mr-10 max-sm:mr-0 flex-grow p-2">
            {message?.split("\n").map((par, i) => (
              <span key={`par-${i}`} className="flex flex-col gap-4">
                {par}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export const UserMessage: React.FC<UserMessageDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-end max-sm:items-end gap-5 text-left">
      <div className="p-2 w-3/5 max-sm:w-3/4 bg-blue-500 text-white rounded-md flex flex-row items-center justify-between">
        <p className="mr-10 max-sm:mr-0 flex-grow p-2">
          {message?.toString().split("\n").map((par, i) => (
            <span key={`par-${i}`} className="flex flex-col gap-4">
              {par}
            </span>
          ))}
        </p>
        <Image
          src={user_img}
          alt="user-ai-generated"
          className="w-16 h-16 rounded-full pointer-events-none p-2"
        />
      </div>
    </div>
  );
};

export const MessageDashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div id="chatbot-dashboard" className="flex flex-col w-full h-96 overflow-y-auto p-10 max-sm:p-5 gap-5 max-lg:ml-10 max-lg:mr-10 max-sm:ml-0 max-sm:mr-0 max-sm:py-5 rounded-md bg-white text-black">
      {children}
    </div>
  );
};
