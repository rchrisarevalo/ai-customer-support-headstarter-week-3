import React from "react";

interface MessageDisplayProps {
  message: string;
}

interface DashboardProps {
  children: React.ReactNode;
}

export const ChatBotMessage: React.FC<MessageDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-left text-left">
      <div className="p-5 w-3/5 max-sm:w-3/4 bg-blue-500 text-white rounded-md">
        <p className="mr-10 max-sm:mr-0">{message}</p>
      </div>
    </div>
  );
};

export const UserMessage: React.FC<MessageDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-end text-left">
      <div className="p-5 w-3/5 max-sm:w-3/4 bg-slate-300 text-black rounded-md">
        <p className="mr-10 max-sm:mr-0">{message}</p>
      </div>
    </div>
  );
};

export const MessageDashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex flex-col p-10 gap-5 max-lg:ml-10 max-lg:mr-10 max-sm:ml-0 max-sm:mr-0 rounded-md max-sm:w-full bg-white text-black">
      {children}
    </div>
  );
};
