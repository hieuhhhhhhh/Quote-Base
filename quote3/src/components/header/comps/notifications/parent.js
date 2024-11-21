import Board from "./notification_board";
import fetchNotifications from "./helpers/fetch_notifications";

export default function Parent() {
  const emptyMsg =
    "You will have a notification when someone interacts with your post!";

  return (
    <Board
      fetchNotifications={fetchNotifications}
      emptyMsg={emptyMsg}
      tittle="Notifications"
    />
  );
}
