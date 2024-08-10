import ChatBotUI from "./components/ChatBotUI";
import robot from "./images/robot.png";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white text-black">
      <div className="flex flex items-center justify-center">
      <img
        src={robot.src}
        alt="large-decorative-image"
        className="w-full h-auto object-cover p-2"
      />
      </div>
      <div className="flex-col items-center justify-center w-4/5 min-h-screen bg-slate-300">
        <h1 className="font-extrabold text-3xl max-sm:text-2xl text-center pt-8">
          Customer Support Chatbot
        </h1>
        <ChatBotUI />
      </div>
    </main>
  );
}
