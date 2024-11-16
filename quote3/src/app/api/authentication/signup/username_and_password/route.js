import bcrypt from "bcryptjs";
import { setTokenCookie } from "../../login/helpers/set_token_cookie";
import supabase from "@/lib/db/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json(); // Parsing the body correctly

    const hashed = await bcrypt.hash(password, 5);

    // Add and get the returned id of the new user
    const res = await supabase
      .from("users")
      .insert([{ username, password_hash: hashed }])
      .select("id");

    if (res.error) {
      throw new Error(JSON.stringify(res.error));
    }

    let response = NextResponse.json(
      {headers: { "Content-Type": "application/json" }},
      {status: 201}, // Return a success status code
    );

    // Retrieve the inserted id from the response
    const insertedUser = res.data[0]; // The first item is the inserted user
    const userId = insertedUser?.id;

    // Set token cookie onto response:
    setTokenCookie(response, userId);

    return response;
  } catch (e) {
    return new Response(e.message, {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
