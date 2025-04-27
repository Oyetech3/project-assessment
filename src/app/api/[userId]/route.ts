import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: {
      userId: string;
    };
  };

export async function GET(request: NextRequest,  context : RouteParams) {
    const { userId } = context.params;

    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
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

export async function PUT(request: NextRequest, context : RouteParams) {
    const { userId } = context.params;

    const body = await request.json();
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
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

export async function DELETE(request: NextRequest,  context : RouteParams) {
    const { userId } = context.params;

    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: "DELETE",
        headers: {
            "x-api-key": "reqres-free-v1",
        },
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: response.status }
        );
    }

    return new NextResponse(null, { status: 204 });
}