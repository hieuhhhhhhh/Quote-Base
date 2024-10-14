import supabase from "@/lib/db/client"; // Supabase client
import Shuffle from "@/lib/back_end/shuffle";

let lastUpdate = "";
let postIds = [];

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("env")
      .select("env->>posts_last_update") // Fetch the specific JSONB field
      .eq("id", 0) // Ensure row with id = 0
      .single(); // Ensure only a single row is returned

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    const DbLastUpdate = data["env->>posts_last_update"]; // Extract the value from data

    if (lastUpdate != DbLastUpdate) {
      console.log("fetching posts from db");
      lastUpdate = DbLastUpdate;
      // Call the Supabase function to get the latest 100 posts
      const { data, error } = await supabase.rpc("get_latest_posts", {
        limit_count: 300,
      });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      // Store data, reuse them later incase db not changed
      postIds = data;
    }

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
