import { DecodeToken } from "@/lib/back_end/decode_token";
import SaveProfilePicURL from "./helpers/save_pfp_URL";
import GenerateWebp from "./helpers/generate_webp";
import UploadImg from "./helpers/upload_img";
import GetProfilePicURL from "./helpers/get_pfp_URL";

export async function POST(req) {
  try {
    const userId = await DecodeToken(req);

    if (userId === null) {
      throw new Response("No token or invalid token", {
        status: 401,
      });
    }

    const webp = await GenerateWebp(req);

    // Upload webp to supabase storage:
    const fileName = await UploadImg(userId, webp);

    // Generate URL for the uploaded image
    const url = await GetProfilePicURL(fileName);

    // Store URL to db (not await this one):
    SaveProfilePicURL(userId, url);

    // Respond URL upon success
    return new Response(JSON.stringify({ url: url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    // catch error responses
  } catch (e) {
    return e;
  }
}
