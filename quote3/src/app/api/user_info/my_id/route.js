// read token => return user's id

import { DecodeToken } from "@/lib/back_end/decode_token";

export async function GET(req) {
  const userId = await DecodeToken(req);

  if (userId === null) {
    return new Response(
      JSON.stringify({ message: "No token got or Invalid token" }),
      { status: 401 }
    );
  }

  return new Response(JSON.stringify({ myId: userId }), { status: 200 });
}
