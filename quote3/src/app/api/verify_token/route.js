import jwt from "jsonwebtoken";
import { parse } from "cookie";

export async function GET(req) {
  // Parse cookies from the request
  const cookieHeader = req.headers.get("cookie");
  const cookies = parse(cookieHeader || "");
  const token = cookies.session_token;

  if (!token) {
    return new Response("No token got", {
      status: 401,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return new Response(
      JSON.stringify({ message: "Token is valid", user: decoded }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(e.message, { status: 401 });
  }
}
