import styles from "./post_board.module.css";
import Preview from "./comps/preview";

function PostPreviews({ posts, onClickPost }) {
  return (
    <div className={styles.previewsBox}>
      {posts.map((each, index) => (
        <div
          key={index} // Ensure unique keys
          onClick={() => {
            onClickPost(each.id);
          }} // Handle click event
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
