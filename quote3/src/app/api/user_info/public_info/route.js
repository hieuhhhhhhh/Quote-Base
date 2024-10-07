// for: profile page
// take: user id
// return: biography, full profile pic, ...tbc

import supabase from "@/lib/db/client";

export async function POST(req) {
  const { user_id } = await req.json(); // Parsing JSON body

  if (!user_id) {
    return new Response(JSON.stringify({ error: "no user_id got" }), {
      status: 400,
    });
  }

  const { data } = await supabase
    .from("users_info")
    .select("biography")
    .eq("user_id", user_id)
    .single();

  return new Response(JSON.stringify({ biography: data?.biography || "" }), {
    status: 200,
  });
}
