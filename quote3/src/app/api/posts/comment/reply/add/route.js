import { DecodeToken } from "@/lib/back_end/decode_token";
import supabase from "@/lib/db/client";

export async function POST(req) {
  try {
    const { comment, parent_id } = await req.json();
    const commenter_id = await DecodeToken(req);

    if (commenter_id === null) {
      throw new Response("No token got or Invalid token", {
        status: 401,
      });
    }

    const res = await supabase
      .from("comments")
      .insert([
        { comment: comment, commenter_id: commenter_id, parent_id: parent_id },
      ])
      .select("*");

    if (res.error) {
      throw new Response(res.error.message, { status: 500 });
    }
    console.log("Data: ", res.data);

    const added = res.data[0];
    return new Response(JSON.stringify({ added: added }), { status: 200 });

    //
  } catch (e) {
    if (e instanceof Response) return e;

    return new Response(e.message, { status: 500 });
  }
}
