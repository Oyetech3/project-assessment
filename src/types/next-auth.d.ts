import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
        };
        accessToken?: string;
        tokenExpiry?: number;
    }

    interface JWT {
        id: string;
        email: string;
        token?: string;
        tokenExpiry?: number;
    }
}