import supabase from "@/lib/db/client"; // Import the existing Supabase client
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"; // assuming Next.js is being used

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Fetch user from the database (including user ID)
    const { data: user, error } = await supabase
      .from("users") // assuming the users table is named 'users'
      .select("id, username, password_hash") // select user_id, username, and hashed password
      .eq("username", username)
      .single();

    if (error || !user) {
      console.error("Error (server): ", error);
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 400 }
      );
    }

    // Compare provided password with the stored hashed password
    const isMatched = await bcrypt.compare(password, user.password_hash);

    if (!isMatched) {
      console.error("Error (server): wrong password.");
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 400 }
      );
    }

    // Generate JWT token containing the user ID
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Create a response
    const response = NextResponse.json({
      message: `Success: logged in ${user.username}`,
    });

    // Set the cookie in the response headers
    response.cookies.set("session_token", token, {
      httpOnly: true,
      maxAge: 7200,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (e) {
    console.error("Error (server): ", e.message);

    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
