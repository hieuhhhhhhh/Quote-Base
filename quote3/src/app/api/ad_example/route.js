// return: url for the ad

import supabase from "@/lib/db/client";

export async function GET() {
  try {
    // Fetch the ad URL (ensure only one record is returned using `.single()`)
    const { data, error } = await supabase
      .from("ad")
      .select("url")
      .eq("id", 1)
      .single(); // This ensures we get a single object rather than an array

    // If an error occurs in the query, throw it
    if (error) {
      throw new Error(error.message);
    }

    // If data exists, return the URL, otherwise return an empty string
    return new Response(
      JSON.stringify({ url: data?.url || "" }), // Return the URL or empty string
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors and return a 500 status
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while fetching the ad.",
      }),
      { status: 500 }
    );
  }
}
