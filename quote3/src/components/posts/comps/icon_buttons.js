import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faBookmark,
  faFlag,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons"; // Add solid icon for active state
import {
  faThumbsUp as faThumbsUpSolid,
  faBookmark as faBookmarkSolid,
  faFlag as faFlagSolid,
} from "@fortawesome/free-solid-svg-icons"; // Add solid icon for active state
import styles from "../post_board.module.css";

export default function IconButtons({
  data,
  isLiked,
  onLikeUnlike,
  isSaved,
  onSaveUnsave,
  isReported,
  onReportWithdrawReport,
  isDeletable,
  onDelete,
}) {
  return (
    <div>
      {isLiked != null && (
        <span onClick={onLikeUnlike} className={styles.iconBtn}>
          <FontAwesomeIcon
            icon={isLiked ? faThumbsUpSolid : faThumbsUp}
            title="Like"
            color={isLiked ? "var(--theme-color)" : ""}
          />

          <span
            style={{
              paddingLeft: "5px",
              color: isLiked ? "var(--theme-color)" : "",
            }}
          >
            {data?.likes}
          </span>
        </span>
      )}
      {isSaved != null && (
        <span onClick={onSaveUnsave} className={styles.iconBtn}>
          <FontAwesomeIcon
            icon={isSaved ? faBookmarkSolid : faBookmark}
            title="Save"
            color={isSaved ? "var(--theme-color)" : ""}
          />
          <span
            style={{
              paddingLeft: "5px",
              color: isSaved ? "var(--theme-color)" : "",
            }}
          >
            {isSaved ? "Saved" : "Save"}
          </span>
        </span>
      )}
      {isReported != null && (
        <span onClick={onReportWithdrawReport} className={styles.iconBtn}>
          <FontAwesomeIcon
            icon={isReported ? faFlagSolid : faFlag}
            title="Report"
            color={isReported ? "var(--negative-color)" : ""}
          />
          <span
            style={{
              paddingLeft: "5px",
              color: isReported ? "var(--negative-color)" : "",
            }}
          >
            {isReported ? "Reported" : "Report"}
          </span>
        </span>
      )}
      {isDeletable == true && (
        <span onClick={onDelete} className={styles.iconBtn}>
          <FontAwesomeIcon icon={faTrashAlt} title="Delete" />
          <span> Delete</span>
        </span>
      )}
    </div>
  );
}
