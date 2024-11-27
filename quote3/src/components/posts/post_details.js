import styles from "./post_board.module.css";
import { useState, useEffect } from "react";
import FetchPostDetail from "@/lib/front_end/post/post_details";
import LikeUnlikePost from "@/lib/front_end/post/like_unlike_post";
import SaveUnsavePost from "@/lib/front_end/post/save_unsave_post";
import ReportWithdrawReport from "@/lib/front_end/post/report_withdraw_report";
import CommentsParent from "./comment/parent";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import IconButtons from "./comps/icon_buttons";
import PreviewInDetails from "./comps/preview_in_details";

function PostDetails({ id, onClose, onShrink, refetch }) {
  const [data, setData] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [isSaved, setIsSaved] = useState(null);
  const [isReported, setIsReported] = useState(null);

  const myId = useSelector((state) => state.myProfile.id);
  const router = useRouter(); // For redirecting after login

  const onLikeUnlike = () => {
    if (!myId) {
      // user no login yet
      router.push("/pages/login");
      return;
    }

    LikeUnlikePost(isLiked, id);
    setIsLiked(!isLiked);

    setData((prev) => ({
      ...prev,
      likes: prev.likes + (isLiked ? -1 : 1),
    }));
  };

  const onSaveUnsave = async () => {
    if (!myId) {
      // user no login yet
      router.push("/pages/login");
      return;
    }

    await SaveUnsavePost(isSaved, id);
    setIsSaved(!isSaved);

    if (refetch) {
      refetch((prev) => prev + 1);
      onShrink(false);
    }
  };

  const onReportWithdrawReport = () => {
    if (!myId) {
      // user no login yet
      router.push("/pages/login");
      return;
    }

    ReportWithdrawReport(isReported, id);
    setIsReported(!isReported);
  };

  useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }
    const fetch = async () => {
      const res = await FetchPostDetail(id, myId);

      setData(res);
      setIsLiked(res.is_liked);
      setIsSaved(res.is_saved);
      setIsReported(res.is_reported);
    };

    fetch();
  }, [id]);

  if (data)
    return (
      <>
        {onClose && (
          <div className={styles.exit}>
            <button
              onClick={() => {
                onClose();
              }}
              style={{ cursor: "pointer" }}
            >
              X
            </button>
          </div>
        )}
        <div className={styles.tittle}>
          <div className="avatarHolder">
            <img
              src={data?.avatar !== "" ? data?.avatar : "/default_pfp.webp"}
              className="avatar"
            />
          </div>
          <div style={{ paddingLeft: "10px" }}>{data?.name}</div>
        </div>

        <PreviewInDetails
          img={data.background_img}
          content={data.content}
          author={data.author}
          BGcolor={data.background_color}
          whiteText={data.text_is_white}
        />
        <div style={{ padding: "10px" }}></div>
        <IconButtons
          data={data}
          isLiked={isLiked}
          onLikeUnlike={onLikeUnlike}
          isSaved={isSaved}
          onSaveUnsave={onSaveUnsave}
          isReported={isReported}
          onReportWithdrawReport={onReportWithdrawReport}
        />
        <CommentsParent post_id={id} />
      </>
    );
}

export default PostDetails;
