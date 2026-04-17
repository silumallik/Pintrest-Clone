// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const token = req.cookies.get("token");

//   if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };


// import { NextResponse } from "next/server";
// import { verifyToken } from "@/lib/jwt";

// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const verified = verifyToken(token);

//   if (!verified) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/create", "/profile/:path*"],
// };




import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // optional custom logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect specific routes
// export const config = {
//   matcher: [
    // "/create",
    // "/profile/:path*",
    // "/api/pins/:path*",
    // "/api/users/:path*",
    // "/api/comments/:path*",
  // ],
};
