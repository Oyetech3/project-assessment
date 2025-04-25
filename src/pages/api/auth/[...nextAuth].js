import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                const res = await fetch("https://reqres.in/api/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })

                const user = await res.json()

                if (res.ok && user.token) {
                    return {id: user.id, email: credentials?.email, token: user.token}
                }
                return null
            }
        })
    ],
    callbacks: {
        async session({session , token}) {
            session.user = token.user
            return session
        },
        async jwt({token, user}) {
            if(user) {
                token.user = user
            }
            return token
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
       // maxAge: 30 * 24 * 60 * 60, // 30 days
    }
})