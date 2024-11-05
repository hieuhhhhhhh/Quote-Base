import { useRef, useEffect } from "react";
import styles from "./post_board.module.css";
import Preview from "./comps/preview";

function PostPreviews({ posts, onClickPost, seID, setSeID, detailsOpen }) {
  const refs = useRef([]);

  // Scroll to seID
  useEffect(() => {
    if (seID !== null) {
      const index = posts.findIndex((post) => post.id === seID);
      if (index !== -1 && refs.current[index]) {
        refs.current[index].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [detailsOpen]);

  return (
    <div className={styles.previewsBox}>
      {posts.map((each, index) => (
        <div
          key={index}
          ref={(el) => (refs.current[index] = el)}
          onClick={() => {
            setSeID(each.id); // Set the selected post ID
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
