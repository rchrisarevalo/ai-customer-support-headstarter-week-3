'use client'

import ChatBotUI from "./components/ChatBotUI";
import robot from "./images/robot.png";
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState, FormEvent } from "react";
import '@fontsource/poppins'

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setIsSignUp(false); // Switch back to sign-in form
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <main className="flex min-h-screen bg-white">
      {!user ? (
        <>
      <div className="flex flex-col items-center justify-center">
      <h1 className="font-[poppins] font-blue-700 font-extrabold text-2xl max-sm:text-2xl text-center pt-8">
          Hello! 
          <br/>
          My name is WanderAI
          <br/> 
          and I am your personal 
          <br/>
          AI assistant!
        </h1>
      <img
        src={robot.src}
        alt="A friendly robot AI assistant"
        className="w-full h-auto object-cover p-2"
      />
      <button
              onClick={handleSignOut}
              className="mt-4 font-[poppins] p-2 bg-red-700 text-white rounded-lg shadow-lg"
            >
              Sign Out
            </button>
      </div>
      <div className="flex-col items-center justify-center w-4/5 min-h-screen bg-white">
        <h1 className="font-[poppins] font-bold text-3xl max-sm:text-2xl text-center pt-8">
          Ask me anything . . .
        </h1>
        <ChatBotUI />
            </div>
        </>
        ) : (
    <div className="flex flex-col items-center justify-center p-20 position-relative">
      <h1 className="font-[poppins] text-blue-900 font-extrabold text-3xl text-center pt-8">
        Hello!
        My name is WanderAI 
        <br/>
        and I am your personal 
        AI assistant!
      </h1>
      <div className="flex flex-row items-center justify-center w-full max-w-3xl max-h-screen bg-white"> 
        <img
          src={robot.src}
          alt="A friendly robot AI assistant"
          className="object-cover pr-20"
        />
        <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-green-100 rounded-lg shadow-lg p-2 w-full max-w-md">
          <div className="p-8 bg-white rounded-lg shadow-lg">
          <h1 className="font-[poppins] font-bold text-5xl text-blue-900 sm:text-5xl text-center mb-6">
            {isSignUp ? 'Sign-Up' : 'Sign In'}
          </h1>
          <form
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
            className="flex flex-col items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-3 font-[poppins] border border-gray-200 rounded mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-3 font-[poppins] border border-gray-200 rounded mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              className="p-3 font-[poppins] w-full bg-slate-100 text-blue-900 font-bold rounded shadow-md hover:bg-blue-100 transition-all"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-4 font-[poppins] text-blue-500"
          >
            {isSignUp ? 'Already have an account? Sign-In' : 'Don\'t have an account? Sign Up'}
          </button>
          {error && <p className="text-red-500 font-[poppins] mt-2">{error}</p>}
          </div>
        </div>
      </div>
      </div>
        )}
    </main>
  );
}
