import styles from './Comment.module.css';
import dateFormatter from '../../../utils/dateFormatter';
import useComments from '../../../hooks/useComments';
import CommentForm from './form/CommentForm';

const Comment = ({ postId }) => {
  const { comments, loading, error, update, setUpdate } = useComments();

  if (loading) {
    return (
      <>
        <h4 className={styles.comments}>Comments</h4>
        <h5 className={styles.loading}>Loading...</h5>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h4 className={styles.comments}>Comments</h4>
        <h5 className={styles.error}>A network error was encountered</h5>
      </>
    );
  }

  return (
    <section>
      <h4 className={styles.comments}>Comments</h4>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <article className={styles.Comment} key={comment.id}>
            <h5 className={styles.author}>
              {comment.name} •{' '}
              <span className={styles.createdAt}>
                {dateFormatter(comment.createdAt)}
              </span>
            </h5>
            <p className={styles.content}>{comment.content}</p>
          </article>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <CommentForm postId={postId} update={update} setUpdate={setUpdate} />
    </section>
  );
};

export default Comment;
