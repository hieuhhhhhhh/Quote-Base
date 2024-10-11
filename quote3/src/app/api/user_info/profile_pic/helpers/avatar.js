import sharp from "sharp"; // Use sharp for image manipulation
import UploadImg from "./upload_img";
import GetProfilePicURL from "./get_pfp_URL";
import supabase from "@/lib/db/client";

export default async function GenerateUploadAvatar(userId, webp) {
  try {
    const avatar = await sharp(webp)
      .resize(100, 100) // Resize to 50x50
      .toBuffer(); // Get the buffer of the resized image

    const fileName = await UploadImg(`${userId}.avatar`, avatar);

    // Generate URL for the uploaded image
    const rawUrl = await GetProfilePicURL(fileName);
    const url = `${rawUrl}?t=${new Date().getTime()}`; // add timestamp on url to refresh browser's cache

    // Store URL to db
    const { error } = await supabase
      .from("users_info")
      .upsert({ user_id: userId, avatar: url }); // Use upsert to insert or update

    if (error) {
      throw new Error(error.message); // Throw an error with the specific message if there is an error
    }

    // Return url of avatar:
    return url;

    //
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Rethrow the response error
    }

    // Handle other types of errors
    throw new Response(`${error.message}`, {
      status: 500,
    });
  }
}
