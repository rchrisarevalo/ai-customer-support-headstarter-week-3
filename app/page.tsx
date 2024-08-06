export default function Home() {
  return (
    <main className="flex min-h-screen bg-white text-black flex-col items-center justify-center">
      <div className="flex flex-col item-center bg-slate-100 justify-center gap-5 text-left ml-32 mr-32 p-20 rounded-2xl">
        <h1 className="font-extrabold text-3xl">Cutomer Support Chatbot</h1>
        <i>
          Ask any questions you might have. and we will give them to you!
        </i>
        <form className="flex flex-row items-center justify-center gap-10 text-left rounded-md">
          <textarea className="border-transparent pb-4 bg-white outline-transparent p-4 items-center resize-none w-full" required></textarea>
          <div className="flex flex-col justify-center items-center">
            <button className="p-4 py-2 rounded-md bg-slate-500 text-white font-extrabold">Send</button>
          </div>
        </form>
      </div>
    </main>
  );
}
