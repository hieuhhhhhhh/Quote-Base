import bcrypt from "bcryptjs";
import supabase from "@/lib/db/client";

export async function POST(req) {
  try {
    const { username, password } = await req.json(); // Parsing the body correctly

    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password_hash: hashed }]);

    if (error) {
      throw new Error(JSON.stringify(error));
    }
    console.log("data: ", data);

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200, // Return a success status code
    });
  } catch (e) {
    return new Response(e.message, {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
