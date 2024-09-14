import supabase from "@/lib/client1";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
    });
  }

  try {
    const { data, error } = await supabase
      .from("users") // Replace 'users' with your table name
      .select("*")
      .eq("username", username);

    if (error) {
      throw error;
    }

    const usernameExists = data.length > 0;

    return new Response(JSON.stringify({ exists: usernameExists }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
