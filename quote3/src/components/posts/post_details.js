import styles from "./post_board.module.css";
import { useState, useEffect } from "react";
import FetchPostDetail from "@/lib/front_end/post/post_details";
import LikeUnlikePost from "@/lib/front_end/post/like_unlike_post";
import SaveUnsavePost from "@/lib/front_end/post/save_unsave_post";
import CommentsParent from "./comment/parent";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import preventBodyScroll from "./prevent_scroll";

function PostDetails({ id, onClose }) {
  const [data, setData] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [isSaved, setIsSaved] = useState(null);

  const [IsScrolling, setIsScrolling] = useState(false);

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

    const onSaveUnsave = () => {
    if (!myId) {
      // user no login yet
      router.push("/pages/login");
      return;
    }

    SaveUnsavePost(isSaved, id);
    setIsSaved(!isSaved);

    setData((prev) => ({
      ...prev,
      saves: prev.saves + (isSaved ? -1 : 1),
    }));
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
    };

    fetch();
  }, [id]);

  preventBodyScroll(IsScrolling);

  return (
    <>
      {data && (
        <div
          className={styles.scroll}
          onMouseEnter={() => {
            setIsScrolling(true);
          }}
          onMouseLeave={() => {
            setIsScrolling(false);
          }}
        >
          <div className={styles.exit}>
            <button
              onClick={() => {
                onClose();
              }}
            >
              Close
            </button>
          </div>
          <div>
            Owner Avatar:
            <div className="avatarHolder">
              <img
                src={data?.avatar !== "" ? data?.avatar : "/default_pfp.webp"}
                className="avatar"
              />
            </div>
          </div>
          <p>
            Owner Name:
            {data?.alias.length > 0 ? data?.alias : data?.username}
          </p>
          <p style={{ whiteSpace: "pre-line" }}>{data?.content}</p>
          <p>Likes: {data?.likes}</p>
          <div className={styles.buttonContainer}>
            {isLiked != null && (
              <button onClick={onLikeUnlike}>
                {isLiked ? "Unlike" : "Like"}
              </button>
            )}
            {isSaved != null && (
              <button onClick={onSaveUnsave}>
                {isSaved ? "Unsave" : "Save"}
              </button>
            )}
          </div>
          <CommentsParent post_id={id} />
        </div>
      )}
    </>
  );
}

export default PostDetails;
