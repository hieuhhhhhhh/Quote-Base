// take: user id
// return: mini profile pic, alias, username

import supabase from "@/lib/db/client";

export async function POST(req) {
  const { user_id } = await req.json(); // Parsing JSON body

  if (!user_id) {
    return new Response(JSON.stringify({ error: "no user_id got" }), {
      status: 400,
    });
  }

  // Get alias:
  const { data: data1 } = await supabase
    .from("users_info")
    .select("alias")
    .eq("user_id", user_id)
    .single();

  // Get username:
  const { data: data2 } = await supabase
    .from("users")
    .select("username")
    .eq("id", user_id)
    .single();

  return new Response(
    JSON.stringify({
      alias: data1?.alias || "",
      username: data2?.username || "",
    }),
    { status: 200 }
  );
}
