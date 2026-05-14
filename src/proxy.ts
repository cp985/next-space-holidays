// export {auth as proxy} from "./auth/auth"

// export const config = {
//   matcher: [
//     "/shop",
//     "/shop/:path*",
//   ],
// };

import { auth } from "@/auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;


  if (req.nextUrl.pathname.startsWith("/shop") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/shop/:path*"],
};
