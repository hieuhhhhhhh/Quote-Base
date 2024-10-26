import supabase from "@/lib/db/client";

export async function POST(req) {
  try {
    const { post_id } = await req.json();

    // Fetch comments based on post_id
    const { data: cmts, error } = await supabase
      .from("comments")
      .select("id, commenter_id, birth_time, likes, comment")
      .eq("post_id", post_id)
      .order("birth_time", { ascending: false });

    if (error) {
      throw new Response(error.message, { status: 500 });
    }

    let cmtInfos = cmts;

    if (cmtInfos) {
      cmtInfos = await Promise.all(
        cmtInfos.map(async (each) => {
          const commenter_id = each.commenter_id;

          const [
            { data: info1, error: error1 },
            { data: info2, error: userError },
          ] = await Promise.all([
            supabase
              .from("users_info")
              .select("alias, avatar")
              .eq("user_id", commenter_id)
              .single(),
            supabase
              .from("users")
              .select("username")
              .eq("id", commenter_id)
              .single(),
          ]);

          if (error1 || userError) {
            console.error("Error fetching user info:", error1 || userError);
          }

          each.commenter = {
            id: commenter_id,
            name: info1?.alias || info2?.username || "Unknown",
            avatar: info1?.avatar || "",
          };

          return each;
        })
      );
    }

    return new Response(JSON.stringify(cmtInfos), { status: 200 });
  } catch (e) {
    if (e instanceof Response) return e;
    return new Response(e.message, { status: 500 });
  }
}
