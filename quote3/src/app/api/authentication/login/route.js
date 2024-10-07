import bcrypt from "bcryptjs";
import { fetchAuthentication } from "./helpers/fetch_authentication";
import { setTokenCookie } from "./helpers/set_token_cookie";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // 1.0: Get password + id by username from db
    const authen = await fetchAuthentication(username);

    // 1.1: Compare provided password with the stored hashed password
    const isMatched = await bcrypt.compare(password, authen.password_hash);

    if (!isMatched) {
      console.error("Error (server): wrong password.");
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 400 }
      );
    }

    // 2: Create a response
    let response = NextResponse.json({
      message: `Success: logged in ${username}`,
    });

    // 3: Set token cookie onto response:
    setTokenCookie(response, authen.id);

    return response;
  } catch (e) {
    console.error("Error (server): ", e.message);

    return NextResponse.json(
      { error: `Server error: ${e.message}` },
      { status: 500 }
    );
  }
}
