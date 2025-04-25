export async function GET(request: Request) {
    const response = await fetch('https://reqres.in/api/users?page=2', {
        cache: "no-cache",
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json()

    return new Response(JSON.stringify(data.data), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    })
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