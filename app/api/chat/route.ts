import { NextRequest, NextResponse } from "next/server";

// Template included from Bill's video.
const GET = async (req: NextRequest) => {
    return NextResponse.json({ message: "This is an API endpoint."})
}

export { GET }