import supabase from "@/lib/db/client";

export default async function GetImgURL(fileName) {
  const { data, error: urlError } = supabase.storage
    .from("post_backgrounds")
    .getPublicUrl(fileName);

  if (urlError) {
    throw new Response(`Error getting URL: ${urlError.message}`, {
      status: 500,
    });
  }

  // Concatenate the timestamp query parameter to the URL
  const url = `${data.publicUrl}?t=${new Date().getTime()}`;

  return url;
}
