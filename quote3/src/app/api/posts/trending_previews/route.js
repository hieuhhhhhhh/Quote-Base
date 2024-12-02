import supabase from "@/lib/db/client";
export async function POST(req) {
  try {
    const { timeRange } = await req.json();
    const limit = 300;
    let data = {};
    let startDate;

    if (!timeRange || timeRange === "all") {
      // All time
      const res = await supabase.rpc("get_posts_by_likes", {
        limit_count: limit, // Pass the limit value as a parameter
      });

      //  Handle any errors from the query
      if (!res.data) {
        return new Response(
          JSON.stringify({ error: res.error?.message || "RPC call failed" }),
          {
            status: 500,
          }
        );
      }
      data = res.data;
    } else {
      // Determine the start date based on timeRange
      if (timeRange === "day") {
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Start of day
      } else if (timeRange === "week") {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of the week (Sunday)
        startDate.setHours(0, 0, 0, 0);
      } else if (timeRange === "month") {
        startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ); // Start of the month
      } else if (timeRange === "year") {
        startDate = new Date(new Date().getFullYear(), 0, 1); // Start of the year
      } else {
        return new Response(
          JSON.stringify({
            error:
              "Invalid timeRange. Use 'day', 'week', 'month', 'year', or 'all'.",
          }),
          { status: 400 }
        );
      }

      // Query for posts by time range
      const res = await supabase
        .from("posts")
        .select("id")
        .order("likes", { ascending: false })
        .gte("date", startDate.toISOString())
        .limit(limit);

      //  Handle any errors from the query
      if (res.error) {
        return new Response(JSON.stringify({ error: res.error.message }), {
          status: 500,
        });
      }

      data = res.data;
    }

    // Return response
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    // Handle any unexpected errors
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}