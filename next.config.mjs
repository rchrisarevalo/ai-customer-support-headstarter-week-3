/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        GROQ_API_KEY: process.env.GROQ_API_KEY,
        GROQ_PROMPT: process.env.GROQ_PROMPT,
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_AUTH_PROJECT_ID,
        FIREBASE_STORAGE_BUKCET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MSG_SENDER_ID: process.env.FIREBASE_MSG_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    }
};

export default nextConfig;
