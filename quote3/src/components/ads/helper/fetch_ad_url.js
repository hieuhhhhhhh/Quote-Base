export default async function fetchAdUrl() {
  try {
    // Make the GET request
    const res = await fetch("/api/ad_example", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check for HTTP errors
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch the ad URL.");
    }

    // Parse the response JSON
    const data = await res.json();

    // Validate the response data
    if (!data.url) {
      throw new Error("The response did not contain a valid URL.");
    }

    // Return the fetched URL
    return data.url;
  } catch (error) {
    // Log the error
    console.error("Error (fetchAdUrl):", error.message);

    // Return a structured error response
    return { error: error.message };
  }
}
