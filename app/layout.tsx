import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WanderAI",
  description: "This AI Chatbot is designed to provide intelligent and engaging interactions through natural language processing. Built with advanced machine learning techniques, it offers insightful responses and can handle a variety of tasks, from answering questions to providing recommendations. Whether you’re seeking information, need assistance, or just want to chat, this AI chatbot is here to help with seamless and intuitive communication.",
  metadataBase: new URL("https://wanderai-chatbot.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
