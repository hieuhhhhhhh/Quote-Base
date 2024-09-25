import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log(req.cookies);
  const token = req.cookies.get("session_token")?.value;

  if (!token) {
    console.log("Error (middleware.js): No token");
    return NextResponse.redirect(new URL("/pages/login", req.url));
  }

  // Call the API to verify the token
  const res = await fetch(new URL("/api/decode_token", req.url), {
    headers: {
      cookie: `session_token=${token}`,
    },
  });

  if (res.status !== 200) {
    const data = await res.text();
    console.log("Error (middleware.js): ", data);
    // If verification fails
    return NextResponse.redirect(new URL("/pages/login", req.url));
  }

  // Token is valid, allow access to the protected page
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: "/pages/profile",
};
