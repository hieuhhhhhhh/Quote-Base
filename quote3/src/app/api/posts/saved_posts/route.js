import supabase from "@/lib/db/client";

export async function POST(req) {
  // Extract user_id from the request body
  const { user_id } = await req.json();

  // Query all post ids for the given user_id
  const { data, error } = await supabase
    .from("saves")
    .select("post_id")
    .eq("user_id", user_id);

  // Handle errors
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  const ids = data.map((post) => post.post_id); // Extract ids from the response

  // Return the retrieved ids
  return new Response(JSON.stringify(ids), { status: 200 });
}
