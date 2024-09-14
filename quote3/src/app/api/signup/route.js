import bcrypt from "bcryptjs";
import supabase from "@/lib/db/client";

export async function POST(req) {
  try {
    const { username, password } = await req.json(); // Parsing the body correctly

    const hashed = await bcrypt.hash(password, 10);

    const res = await supabase
      .from("users")
      .insert([{ username, password_hash: hashed }]);

    if (res.error) {
      throw new Error(JSON.stringify(res.error));
    }

    return new Response("Success: a new user created", {
      headers: { "Content-Type": "application/json" },
      status: 201, // Return a success status code
    });
  } catch (e) {
    return new Response(e.message, {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
