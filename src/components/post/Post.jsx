import styles from './Post.module.css';
import usePostDetail from '../../hooks/usePostDetail';
import Comment from './comment/Comment';
import CommentForm from './form/CommentForm';

const Post = () => {
  const { post, loading, error, update, setUpdate } = usePostDetail();

  if (loading) return <p>Loading...</p>;

  if (error) {
    if (error.message === 'Post Not Found') {
      return <p>{error.message}</p>;
    }

    return <p>A network error was encountered</p>;
  }

  return (
    <div className={styles.Post}>
      <h1>{post.title}</h1>
      {post.content}
      <h3>Comments:</h3>
      {post.comments.map((comment) => (
        <Comment
          key={comment.id}
          name={comment.name}
          content={comment.content}
          created={comment.createdAt}
        />
      ))}
      <CommentForm id={post.id} update={update} setUpdate={setUpdate} />
    </div>
  );
};

export default Post;
