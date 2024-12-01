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

  // Check the user's role first
  const { data: roleData, error: roleError } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", user_id)
    .limit(1)
    .single(); // Use `.single()` to get a single row instead of an array

  // If the user is an admin, fetch additional data
  const isAdmin = roleData?.role === "admin" && !roleError;

  if (isAdmin) {
    // Admin can delete any report
    const res = await supabase
      .from("reports")
      .delete()
      .match({ post_id: post_id });

    if (res.error) {
      return new Response(`${res.error.message}`, {
        status: 500,
      });
    }
  } else {
    // Non-admin can only delete their own report
    const res = await supabase
      .from("reports")
      .delete()
      .match({ post_id: post_id, reporter_id: user_id });

    if (res.error) {
      return new Response(`${res.error.message}`, {
        status: 500,
      });
    }
  }

  return new Response(
    `User '${user_id}' withdraw report on post'${post_id}' `,
    {
      status: 200,
    }
  );
}
