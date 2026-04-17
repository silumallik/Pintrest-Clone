// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectDB from "./db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

//working code
// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         await connectDB();

//         const user = await User.findOne({
//           email: credentials.email,
//         });

//         if (!user) throw new Error("User not found");

//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isMatch) throw new Error("Invalid credentials");
//         //wrong
//         // return user;

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//         };

//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {

//     async jwt({ token, user }) {

//       if (user) {
//         token.id = user._id?.toString() || user.id;
//       }

//       return token;
//     },

//     async session({ session, token }) {

//       if (token && session.user) {
//         session.user.id = token.id;
//       }

//       return session;
//     },

//   },

//   pages: {
//     signIn: "/login",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };


//trying code
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) throw new Error("Invalid credentials");
        //wrong
        // return user;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };

      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {

    async jwt({ token, user }) {

      if (user) {
        token.id = user._id?.toString() || user.id;
      }

      return token;
    },

    // async session({ session, token }) {

    //   if (token && session.user) {
    //     session.user.id = token.id;
    //   }

    //   return session;
    // },

    async session({ session, token }) {
    if (token?.id) session.user.id = token.id; // map id into session.user
    return session;
  },

  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: process.env.NODE_ENV === "production" },
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  
};
