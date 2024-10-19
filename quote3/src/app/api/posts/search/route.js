import supabase from "@/lib/db/client";

export async function POST(req) {
  try {
    const { term } = await req.json();
    // Call the Supabase function to get the latest 100 posts
    const { data, error } = await supabase.rpc("search_posts", {
      term: term,
    });

    if (error) {
      throw new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    const ids = data.map((post) => post.id);

    return new Response(JSON.stringify({ ids }), { status: 200 });
    //
  } catch (e) {
    if (e instanceof Response) {
      return e;
    }
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
}
