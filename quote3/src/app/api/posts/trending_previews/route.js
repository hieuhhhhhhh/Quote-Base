import supabase from "@/lib/db/client";
export async function GET(req) {
  try {
    const { data, error } = await supabase.rpc("get_posts_by_likes", {
      limit_count: 300, // Pass the limit value as a parameter
    });

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
