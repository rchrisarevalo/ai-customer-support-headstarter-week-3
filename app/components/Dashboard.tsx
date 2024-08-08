import React from "react";
import Image from "next/image";
import chatbot_img from "../images/bot-ai-generated-img.jpg";
import user_img from "../images/user-ai-generated-img.jpg";
import { Loading } from "./Loading";

interface MessageDisplayProps {
  message: string;
}

interface DashboardProps {
  children: React.ReactNode;
}

export const ChatBotMessage: React.FC<
  MessageDisplayProps & { isLoading: boolean }
> = ({ message, isLoading }) => {
  return (
    <div className="flex flex-col gap-5 items-start text-left">
      <div className="flex items-center">
        <Image
          src={chatbot_img}
          alt="chatbot-ai-generated"
          className="w-16 h-16 rounded-full pointer-events-none"
        />
      </div>
      {isLoading ? (
        <div className="flex items-center">
          <Loading isLoading={isLoading} />
        </div>
      ) : (
        <div className="p-5 w-3/5 max-sm:w-3/4 bg-slate-300 text-black rounded-md">
          <p className="mr-10 max-sm:mr-0">
            {message.split("\n").map((par, i) => (
              <span key={`par-${i}`} className="flex flex-col gap-4">{par}</span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export const UserMessage: React.FC<MessageDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-end max-sm:items-end gap-5 text-left">
      <div className="flex flex-row items-center">
        <Image
          src={user_img}
          alt="user-ai-generated"
          className="w-16 h-16 rounded-full pointer-events-none"
        />
      </div>
      <div className="p-5 w-3/5 max-sm:w-3/4 bg-blue-500 text-white rounded-md">
        <p className="mr-10 max-sm:mr-0">
          {message.split("\n").map((par, i) => (
            <span key={`par-${i}`} className="flex flex-col gap-4">{par}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export const MessageDashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-w-full h-96 overflow-y-scroll p-10 max-sm:p-5 gap-5 max-lg:ml-10 max-lg:mr-10 max-sm:ml-0 max-sm:mr-0 max-sm:py-5 rounded-md max-sm:w-full bg-white text-black">
      {children}
    </div>
  );
};
