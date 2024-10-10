import supabase from "@/lib/db/client";

export default async function GetProfilePicURL(fileName) {
  const { data, error: urlError } = supabase.storage
    .from("profile_pictures")
    .getPublicUrl(fileName);

  if (urlError) {
    throw new Response(`Error getting URL: ${urlError.message}`, {
      status: 500,
    });
  }
  const url = data.publicUrl;

  return url;
}
