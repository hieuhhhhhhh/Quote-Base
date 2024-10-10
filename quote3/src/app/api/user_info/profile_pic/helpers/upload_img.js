import supabase from "@/lib/db/client";

export default async function UploadImg(userId, webp) {
  const fileName = `${userId}.webp`;

  // Upload the WebP image to Supabase Storage
  const { error } = await supabase.storage
    .from("profile_pictures")
    .upload(fileName, webp, {
      contentType: "image/webp",
      upsert: true, // Set to true  to overwrite existing files with the same name
    });

  if (error) {
    throw new Response(`Error uploading image: ${error.message}`, {
      status: 500,
    });
  }

  return fileName;
}
