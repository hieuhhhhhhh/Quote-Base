import supabase from "@/lib/db/client"; // Supabase client
import Shuffle from "@/lib/back_end/shuffle";

export async function GET() {
  try {
    console.log("fetching posts from db");
    // Call the Supabase function to get the latest  posts
    const { data, error } = await supabase.rpc("get_latest_posts", {
      limit_count: 300,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    const postIds = data;

    // Shuffle the data
    Shuffle(postIds);

    // Return  response
    return new Response(JSON.stringify(postIds), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
