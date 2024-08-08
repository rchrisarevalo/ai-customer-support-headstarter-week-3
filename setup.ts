import Groq from "groq-sdk"

// Set up Groq API.
const groq = new Groq({
    apiKey: process.env.API_KEY
})

export default groq;