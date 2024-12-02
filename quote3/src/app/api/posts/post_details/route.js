import supabase from "@/lib/db/client";

export async function POST(req) {
  const { post_id, user_id } = await req.json();

  // Check the user's role first
  const { data: roleData, error: roleError } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", user_id)
    .limit(1)
    .single(); // Use `.single()` to get a single row instead of an array

  // If the user is an admin, fetch additional data
  const isAdmin = roleData?.role === "admin" && !roleError;

  const [
    { data: data1 }, // This is your result from the `get_post_details` function (returns a table)
    { data: data4 }, // Likes
    { data: data5 }, // Saves
    { data: data6 }, // Reports
  ] = await Promise.all([
    supabase.rpc("get_post_details", { input_post_id: post_id }), // Call the function that returns a table

    supabase
      .from("likes")
      .select("*")
      .eq("post_id", post_id)
      .eq("user_id", user_id)
      .limit(1),

    supabase
      .from("saves")
      .select("*")
      .eq("post_id", post_id)
      .eq("user_id", user_id)
      .limit(1),

    supabase
      .from("reports")
      .select("*")
      .eq("post_id", post_id)
      .limit(1)
      .eq(isAdmin ? null : "reporter_id", user_id),
  ]);

  // Since get_post_details returns a table (array of rows), we need to check if there are any rows and pick the first one
  const data = data1 && data1.length > 0 ? data1[0] : null;

  console.log(data?.owner_alias || "");
  return new Response(
    JSON.stringify({
      likes: data?.likes || 0,
      content: data?.content || "",
      author: data?.author || "",
      avatar: data?.owner_avatar || "",
      owner_id: data?.owner_id,
      name: data?.owner_alias || data?.owner_username || "",
      background_img: data?.background_img || "",
      background_color: data?.background_color || "",
      text_is_white: data?.text_is_white ?? true,
      is_liked: data4?.length > 0 || false,
      is_saved: data5?.length > 0 || false,
      is_reported: data6?.length > 0 || false,
    }),
    { status: 200 }
  );
}
