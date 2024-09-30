// this api is just to check if token is valid

import { DecodeToken } from "@/lib/back_end/decode_token";

export async function GET(req) {
  const userId = DecodeToken(req);

  if (userId === null) {
    return new Response("No token got or Invalid token", {
      status: 401,
    });
  }

  return new Response("Valid token", {
    status: 200,
  });
}
