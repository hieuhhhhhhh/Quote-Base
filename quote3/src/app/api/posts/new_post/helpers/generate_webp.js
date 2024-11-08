import sharp from "sharp";

export default async function GenerateWebp(base64) {
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

  // Convert binary to webp
  let webp = await sharp(binary)
    .webp({ quality: 100 }) // Start with maximum quality
    .toBuffer();

  // Compress if file is larger than maxSize
  const maxSize = 200 * 1024; // 200 KB
  const dimension = 1000;
  if (webp.length > maxSize) {
    webp = await sharp(webp)
      .resize({ width: dimension, height: dimension, fit: "inside" }) // Maintain the resized dimension
      .toBuffer();
  }

  return webp;
}
