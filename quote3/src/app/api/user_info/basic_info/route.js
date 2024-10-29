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

  const [{ data: data1 }, { data: data2 }] = await Promise.all([
    supabase
      .from("users_info")
      .select("alias,avatar")
      .eq("user_id", user_id)
      .single(),
    supabase.from("users").select("username").eq("id", user_id).single(),
  ]);

  return new Response(
    JSON.stringify({
      name: data1?.alias || data2?.username || "",
      avatar: data1?.avatar || "",
    }),
    { status: 200 }
  );
}
