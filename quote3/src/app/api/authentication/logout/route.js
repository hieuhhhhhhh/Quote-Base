// pages/api/logout.js

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Logged out and cookie cleared",
  });

  // Clear the cookie by setting it with an expired date
  response.cookies.set("session_token", "", {
    httpOnly: true,
  });

  return response;
}
