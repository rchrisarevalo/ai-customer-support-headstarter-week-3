import Groq from "groq-sdk"

const systemPrompt = () => {
    if (process.env.GROQ_PROMPT) {
        return process.env.GROQ_PROMPT
    } else {
        return "undefined"
    }
}

export const prompts: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt() }
]