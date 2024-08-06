'use client';
import React, { useState } from "react";

export default function Home() {
  const [chatInput, setChatInput] = useState<string>("")

  const handleChatSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/chat", {
        method: 'POST',
        body: JSON.stringify({
          chat_prompt: chatInput
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        const data = await res.json()

        console.log(data)
      }
    } catch {
      throw new Error("Failed to submit chat.")
    }
  };

  return (
    <main className="flex min-h-screen bg-white text-black flex-col items-center justify-center">
      <div className="flex flex-col item-center bg-slate-200 justify-center gap-5 text-left ml-32 mr-32 max-sm:ml-4 max-sm:mr-4 p-32 max-sm:p-12 rounded-2xl">
        <h1 className="font-extrabold text-3xl max-sm:text-2xl">Customer Support Chatbot</h1>
        <i>Ask any questions you might have, and we will give the answers to you!</i>
        <form onSubmit={handleChatSubmission} className="flex flex-row max-sm:flex-col items-center justify-center gap-10 text-left rounded-md">
          <input
            className="border-transparent pb-4 bg-white outline-transparent p-4 items-center resize-none w-full"
            onChange={(e) => setChatInput(e.target.value)}
            required
          />
          <div className="flex flex-col justify-center items-center">
            <button type="submit" className="p-4 py-2 rounded-md bg-slate-500 text-white font-extrabold">
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
