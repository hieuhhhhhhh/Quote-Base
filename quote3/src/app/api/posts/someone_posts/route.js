// this api is to get all posts from a user's id.

import supabase from "@/lib/db/client";

export async function POST(req) {
  // Extract user_id from the request body
  const { user_id } = await req.json();

  // Query to get all content from posts for the given user_id
  const { data, error } = await supabase
    .from("posts")
    .select("content")
    .eq("user_id", user_id);

  // Handle errors
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  // Return the retrieved data
  return new Response(JSON.stringify(data), { status: 200 });
}
