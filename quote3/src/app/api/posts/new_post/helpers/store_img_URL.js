import supabase from "@/lib/db/client"; // Ensure your Supabase client is correctly imported

export default async function StoreImgURL(post_id, url) {
  const { error } = await supabase.from("post_styles").upsert({
    post_id: post_id,
    background_img: url,
  });

  if (error) {
    throw new Response(`Error (store_img_URL.js): ${error.message}`, {
      status: 500,
    });
  }
}
