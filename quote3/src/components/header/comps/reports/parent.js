import Board from "../notifications/notification_board";
import fetchReports from "./helpers/fetch_reports";

export default function Reports() {
  const emptyMsg = "No reports found!";

  return (
    <Board
      fetchNotifications={fetchReports}
      emptyMsg={emptyMsg}
      tittle="Reports"
    />
  );
}
