import { DecodeToken } from "@/lib/back_end/decode_token";
import supabase from "@/lib/db/client";

export async function POST(req) {
  const [{ post_id }, user_id] = await Promise.all([
    req.json(),
    DecodeToken(req),
  ]);

  if (user_id === null) {
    return new Response("No token got or Invalid token", {
      status: 401,
    });
  }

  const res = await supabase
    .from("likes")
    .insert([{ post_id: post_id, user_id: user_id }]);

  if (res.error) {
    return new Response(`${res.error.message}`, {
      status: 500,
    });
  }

  return new Response(`User '${user_id}' liked post'${post_id}' `, {
    status: 200,
  });
}
