import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserData {
  id: string;
  username: string;
  credits: string;
  headquarters: string;
  faction: string;
}

let userData: UserData = {
  id: "",
  username: "",
  credits: "",
  headquarters: "",
  faction: "",
};

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "token",
      name: "Token",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.token) {
          return null;
        }

        const fetchOptions = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials!.token}`,
          },
        };

        try {
          const response = await fetch(
            "https://api.spacetraders.io/v2/my/agent",
            fetchOptions
          );
          if (response.ok) {
            const data = await response.json();

            userData = {
              id: credentials.token,
              username: data["data"]["symbol"],
              credits: data["data"]["credits"],
              headquarters: data["data"]["headquarters"],
              faction: data["data"]["startingFaction"],
            };

            return userData;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = userData.id;
        token.username = userData.username;
        token.credits = userData.credits;
        token.headquarters = userData.headquarters;
        token.faction = userData.faction;
      }
      return token;
    },
    async session({ session, token }) {
      const tokenData = {
        id: token.id,
        username: token.username,
        credits: token.credits,
        headquarters: token.headquarters,
        faction: token.faction,
      }
      session.user = tokenData;
      return session;
    },
  },
};

export default options;
