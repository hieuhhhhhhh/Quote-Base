export default async function fetchNotifications() {
  try {
    const res = await fetch("/api/notifications/reports", {
      method: "GET",
      credentials: "include", // To include cookies with the request
    });

    if (!res.ok) {
      const message = await res.text();
      console.error(message);
      return;
    }

    const data = await res.json();

    return data;

    // 3.1: Failure
  } catch (e) {
    console.error("Error (fetch_notifications.js):", e);
    return;
  }
}
