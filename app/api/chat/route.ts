import { NextRequest, NextResponse } from "next/server";

// Template included from Bill's video.
const POST = async (req: NextRequest) => {
    const data = await req.json()

    return NextResponse.json({ message: data.chat_prompt })
}

export { POST }