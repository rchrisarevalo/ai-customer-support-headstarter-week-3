/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        GROQ_API_KEY: process.env.GROQ_API_KEY,
        GROQ_PROMPT: process.env.GROQ_PROMPT
    }
};

export default nextConfig;
