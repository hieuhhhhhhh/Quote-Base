import styles from "./post_board.module.css";
import {useState} from "react";

function PostPreviews({ posts, trendingPosts, trending, onClickPost }) {
  //const [trending, setTrending] = useState(true); // To track if the posts should be sorted by likes

  return (
    <div>
      <br />
      {trending
        ? trendingPosts.map((each, index) => (
            <div
              key={index} // Ensure unique keys
              onClick={() => {
                onClickPost(each.id);
              }} // Handle click event
              className={styles.postItem}
            >
              "{each.content}"<p></p>
            </div>
          ))
        : posts.map((each, index) => (
            <div
              key={index} // Ensure unique keys
              onClick={() => {
                onClickPost(each.id);
              }} // Handle click event
              className={styles.postItem}
            >
              "{each.content}"<p></p>
            </div>
          ))}
    </div>
  );
}
export default PostPreviews;
