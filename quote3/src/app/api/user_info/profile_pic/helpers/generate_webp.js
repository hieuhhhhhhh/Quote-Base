import sharp from "sharp";

export default async function GenerateWebp(req) {
  const { base64 } = await req.json();

  if (!base64) {
    throw new Response("No Base64 provided", {
      status: 400,
    });
  }

  const binary = Buffer.from(base64, "base64");

  // Validate if the data received was a real image
  try {
    await sharp(binary).metadata();
  } catch (e) {
    throw new Response("Invalid image", {
      status: 400,
    });
  }

  const maxSize = 200 * 1024; // 200 KB

  // Convert to webp
  let webp = await sharp(binary)
    .webp({ quality: 100 }) // Convert to WebP at quality 100
    .toBuffer();

  // Compress file if file large than maxSize
  if (webp.length > maxSize) {
    const size = webp.length;

    const newRatio = Math.round((maxSize / size) * 100);

    webp = await sharp(binary).webp({ quality: newRatio }).toBuffer();
  }

  return webp;
}
