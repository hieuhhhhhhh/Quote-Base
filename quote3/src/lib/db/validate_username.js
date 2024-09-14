import supabase from "@/lib/db/client";

async function validate(username) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single(); // Use single to get a single result

    if (error) {
      throw error;
    }

    return data !== null;
  } catch (error) {
    console.error("Error checking username:", error);
    return false;
  }
}

export default validate;
