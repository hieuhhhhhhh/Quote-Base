// app/api/hello/route.js
import supabase from "@/lib/client1";

export async function GET() {
  const { data, error } = await supabase
    .from("test_table1")
    .select("test_collumn1")
    .eq("id", 1)
    .single(); // Use single() to get a single row

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: data.test_collumn1 }), {
    headers: { "Content-Type": "application/json" },
  });
}
