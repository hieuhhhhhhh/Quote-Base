import supabase from "@/lib/db/client"; // Ensure your Supabase client is correctly imported

export default async function SaveProfilePicURL(userId, url) {
  try {
    const { error } = await supabase
      .from("users_info")
      .upsert({ user_id: userId, profile_pic: url }); // Use upsert to insert or update

    if (error) {
      throw new Error(error.message); // Throw an error with the specific message if there is an error
    }
  } catch (e) {
    return new Response(`Error (save_pfp_URL): ${e.message}`, { status: 500 });
  }

  return new Response("DB updated successfully", { status: 200 });
}
