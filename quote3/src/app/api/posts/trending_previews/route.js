import supabase from "@/lib/db/client";
export async function POST(req) {
  try {
    // Parse the array of IDs from the incoming request
    const { ids } = await req.json();

    // Validate the IDs array
    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid or empty array of IDs" }),
        { status: 400 }
      );
    }

    // Query the "posts" table using Supabase to get the posts ordered by likes
    const { data, error } = await supabase
      .from("posts")
      .select("id, content, author, likes")
      .order("likes", { ascending: false });

    // Handle any errors from the query
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // Return the retrieved data
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    // Handle any unexpected errors
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
