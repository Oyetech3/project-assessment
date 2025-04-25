import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    return NextResponse.json(data, {
        status: 200,
        headers: {
            "Cache-Control": "no-store",
        },
    });
}

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    const body = await request.json();
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
        status: 201,
        headers: {
            "Cache-Control": "no-store",
        },
    });
}

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: "DELETE",
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: response.status }
        );
    }

    return new NextResponse(null, { status: 204 });
}