// take array of post-ids return array of previews

import supabase from "@/lib/db/client";

export async function POST(req) {
  try {
    const { ids } = await req.json();

    // Call the get_post_previews function using Supabase
    const { data, error } = await supabase.rpc("get_post_previews", { ids });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // Return previews
    return new Response(JSON.stringify(data), { status: 200 });

    //
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
