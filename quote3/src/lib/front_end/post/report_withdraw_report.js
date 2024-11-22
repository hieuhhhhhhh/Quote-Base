export default async function ReportWithdrawReport(isReported, post_id) {
  const path = isReported
    ? "/api/posts/report/withdraw_report"
    : "/api/posts/report";

  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post_id: post_id }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log(error);
  }
}
