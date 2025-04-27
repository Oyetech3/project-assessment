import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch("https://reqres.in/api/users", {
        cache: "no-cache",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
        },
    });

    const data = await response.json();

    return NextResponse.json(data.data, {
        status: 200,
        headers: {
            "Cache-Control": "no-store",
        },
    });
}

export async function POST(request: Request) {
    const {name, job} = await request.json()
    const newUser = {
        name,
        job,
    }
    
    const response = await fetch('https://reqres.in/api/users', {
        cache: "no-cache",
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify(newUser),
    })
    const data = await response.json()

    return new Response(JSON.stringify(data), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        }
    })
}