import { useState, useRef, useEffect } from "react";
import styles from "./post_board.module.css";
import Preview from "./comps/preview";

function PostPreviews({
  posts,
  onClickPost,
  seID,
  setSeID,
  detailsOpen,
  trendingPosts,
  trending,
}) {
  const refs = useRef([]);
  const [seIndex, setSeIndex] = useState(0); // seIndex = selectedIndex

  // Scroll to seID
  useEffect(() => {
    if (seID !== null) {
      refs.current[seIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [detailsOpen]);

  return (
    <div className={styles.previewsBox}>
      {trending
        ? trendingPosts.map((each, index) => (
            <div
              key={index}
              ref={(el) => (refs.current[index] = el)}
              onClick={() => {
                setSeID(each.id); // Set the selected post ID
                setSeIndex(index);
                onClickPost(each.id);
              }}
            >
              <Preview
                img={each.background_img}
                content={each.content}
                author={each.author}
                BGcolor={each.background_color}
                whiteText={each.text_is_white}
              />
            </div>
          ))
        : posts.map((each, index) => (
            <div
              key={index}
              ref={(el) => (refs.current[index] = el)}
              onClick={() => {
                setSeID(each.id); // Set the selected post ID
                setSeIndex(index);
                onClickPost(each.id);
              }}
            >
              <Preview
                img={each.background_img}
                content={each.content}
                author={each.author}
                BGcolor={each.background_color}
                whiteText={each.text_is_white}
              />
            </div>
          ))}
    </div>
  );
}

export default PostPreviews;
