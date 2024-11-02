import styles from "./post_board.module.css";

function PostPreviews({ posts, onClickPost }) {
  
  const colors = [
    "#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", 
    "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9"
  ];

  return (
    <div className={styles.container}>
      <div className={styles.quotesContainer}>
        {posts.map((each, index) => (
          <div
            key={index} // Ensure unique keys
            onClick={() => {
              onClickPost(each.id);
            }} // Handle click event
            className={styles.quoteCard}
            style={{ backgroundColor: colors[index % colors.length] }} 
          >
            "{each.content}"
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PostPreviews;
