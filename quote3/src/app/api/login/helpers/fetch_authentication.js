// this function is to fetch password + id from db

import supabase from "@/lib/db/client"; // Import the Supabase client

export async function fetchAuthentication(username) {
  const { data: user, error } = await supabase
    .from("users")
    .select("id, username, password_hash")
    .eq("username", username)
    .single();

  if (error || !user) {
    throw new Error(`Error (fetch_authentication.js): ${error.message}`);
  }

  return user;
}
