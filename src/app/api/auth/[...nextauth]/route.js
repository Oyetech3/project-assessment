import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'reqres-free-v1',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Authentication failed");
          }

          return {
            id: '1', 
            email: credentials.email,
            token: data.token,
            tokenExpiry: Date.now() + 10 * 60 * 1000, 
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
        //token.tokenExpiry = user.tokenExpiry;
        token.tokenExpiry = Date.now() + 10 * 60 * 1000
        return token;
      }

      if (token.tokenExpiry && Date.now() > token.tokenExpiry - 60000) { // Refresh 1 minute before expiry
        try {
          const response = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'reqres-free-v1',
            },
            body: JSON.stringify({
              email: token.email,
              password: "cityslicka", 
            }),
          });

          const data = await response.json();

          if (response.ok) {
            token.token = data.token;
            token.tokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
          }
        } catch (error) {
          console.error("Token refresh error:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      session.user.id = token.id;
      session.user.email = token.email;
      session.accessToken = token.token;
      session.tokenExpiry = token.tokenExpiry;
      
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 60, // 10 minutes in seconds
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };