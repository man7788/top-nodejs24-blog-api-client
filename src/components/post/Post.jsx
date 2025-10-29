import styles from './Post.module.css';
import usePostDetail from '../../hooks/usePostDetail';
import dateFormatter from '../../utils/dateFormatter';
import Comment from './comment/Comment';
import CommentForm from './form/CommentForm';

const Post = () => {
  const { post, loading, error, update, setUpdate } = usePostDetail();
  const formattedDate = dateFormatter(post?.createdAt);

  if (loading) return <h2 className={styles.loading}>Loading...</h2>;

  if (error) {
    if (error?.message === 'Post Not Found') {
      return <h2 className={styles.error}>{error.message}</h2>;
    }

    return <h2 className={styles.error}>A network error was encountered</h2>;
  }

  return (
    <main className={styles.Post}>
      <article>
        <h2 className={styles.title}>
          {post.title}
          <div className={styles.createdAt}>{formattedDate}</div>
        </h2>
        <p className={styles.content}>{post.content}</p>
      </article>
      <section>
        <h4 className={styles.comments}>Comments</h4>
        {post.comments.map((comment) => (
          <Comment
            key={comment.id}
            name={comment.name}
            content={comment.content}
            created={comment.createdAt}
          />
        ))}
        <CommentForm id={post.id} update={update} setUpdate={setUpdate} />
      </section>
    </main>
  );
};

export default Post;
