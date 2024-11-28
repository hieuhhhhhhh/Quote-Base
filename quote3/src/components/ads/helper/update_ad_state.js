const updateAdState = async (userId, adState) => {
  try {
    const res = await fetch("/api/user_info/update_ad_state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, ads: adState }), // Align with expected keys
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update ad state.");
    }

    return data; // Return the server's response data
  } catch (error) {
    console.error("Error updating ad state:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export default updateAdState;
