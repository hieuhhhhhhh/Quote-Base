import supabase from "@/lib/db/client";
export async function GET(req) {
  try {
    // Query the "posts" table using Supabase to get the posts ordered by likes
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .order("likes", { ascending: false })
      .limit(300); // Limit the number of posts retrieved from the database to 300

    // Handle any errors from the query
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // Return  response
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    // Handle any unexpected errors
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
