import jwt from "jsonwebtoken";

export function setTokenCookie(response, userId) {
  // Generate JWT token
  const token = jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  // Set the cookie in the response headers
  response.cookies.set("session_token", token, {
    httpOnly: true,
    maxAge: 7200, // 2 hours in seconds
    sameSite: "strict",
  });
}
