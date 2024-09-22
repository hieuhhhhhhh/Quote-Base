// app/api/login/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { username } = await req.json();

  // Use the secret key from environment variables
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const res = NextResponse.json({ message: `Success: logged in ${username}` });
  res.cookie("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Strict",
    maxAge: 7200, // 1 hour
  });

  return res;
}
