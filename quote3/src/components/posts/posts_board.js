// Edit this file:

export default function PostsBoard({ posts }) {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          {post.content}
          <p></p>
        </div>
      ))}
    </div>
  );
}
