import React, {useState} from "react";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
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

  const [feedback, setFeedback] = useState<null | 'up' | 'down'>(null);

  const handleFeedback = (type: 'up' | 'down') => {
    if (feedback == type)
      setFeedback(null);
    else
      setFeedback(type);
    // Implement further logic like sending feedback to the server here
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
              onClick={() => handleFeedback('up')}
              className={`p-1 rounded-full ${feedback === 'up' ? 'bg-teal-600 text-white' : 'text-gray-400'}`}
            >
              <FaThumbsUp size={12} />
            </button>
            <button
              onClick={() => handleFeedback('down')}
              className={`p-1 rounded-full ${feedback === 'down' ? 'bg-red-500 text-white' : 'text-gray-400'}`}
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
          {message?.toString().split("\n").map((par, i) => (
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
    <div id="chatbot-dashboard" className="flex flex-col w-full h-96 overflow-y-auto p-10 max-sm:p-5 gap-5 max-lg:ml-10 max-lg:mr-10 max-sm:ml-0 max-sm:mr-0 max-sm:py-5 rounded-md bg-white text-black">
      {children}
    </div>
  );
};
