export async function GET(request: Request, { params }: { params: { userId: string } }) {

    const {userId} = params

    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json()

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    })
}


export async function PUT(request: Request, { params }: { params: { userId: string } }) {

    const {userId} = params

    const body = await request.json()
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

export async function DELETE(request: Request, {params}: { params: {userId : string}}) {
    const {userId} = params

    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        cache: "no-cache",
        method: 'DELETE',
    })

    if(!response.ok) {
        return new Response(JSON.stringify({error: "Failed to delete user"}), {status: response.status})
    }
    
    return new Response(null, {
        status: 204,
    })
}