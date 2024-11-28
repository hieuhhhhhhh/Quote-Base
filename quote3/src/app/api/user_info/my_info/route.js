import { DecodeToken } from "@/lib/back_end/decode_token";
import { setTokenCookie } from "../../authentication/login/helpers/set_token_cookie";
import { NextResponse } from "next/server";
import supabase from "@/lib/db/client";

export async function GET(req) {
  const userId = await DecodeToken(req);

  if (userId === null) {
    return new Response(
      JSON.stringify({ message: "No token got or Invalid token" }),
      { status: 401 }
    );
  }

  // Call the get_post_previews function using Supabase
  const { data, error } = await supabase.rpc("get_user_info", {
    user_id_input: userId,
  });

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  // Query to get info on ads for the user
  const { data: adsData, error: adsError } = await supabase
    .from("users_info")
    .select("ads")
    .eq("user_id", userId)
    .single(); // Ensure only one record is returned

  if (adsError) {
    return new Response(
      JSON.stringify({
        message: `Error fetching ads info: ${adsError.message}`,
      }),
      { status: 500 }
    );
  }

  const userInfo = data?.[0];

  let response = NextResponse.json({
    id: userId,
    name: userInfo?.alias || userInfo?.username || "",
    bio: userInfo?.biography || "",
    avatar: userInfo?.avatar || "",
    role: userInfo?.role || "user",
    ads: adsData?.ads ?? true,
  });

  // refresh token:
  setTokenCookie(response, userId);

  return response;
}
