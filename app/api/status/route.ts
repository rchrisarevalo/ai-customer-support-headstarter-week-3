import { NextRequest, NextResponse } from 'next/server'

const GET = async (req: NextRequest) => {
    try {
        return NextResponse.json({"server_status_code": 200})
    } catch {
        return NextResponse.json({"server_status_code": 500})
    }
}

export { GET }