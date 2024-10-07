const removeToken = async () => {
  try {
    const response = await fetch("/api/authentication/logout", {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });

    if (response.ok) {
      console.log("Logged out successfully");
    } else {
      console.error("Failed to remove cookie");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export default removeToken;
