import styles from './Comment.module.css';
import CommentForm from './form/CommentForm';

const Comment = ({ id }) => {
  return (
    <div className={styles.Comment}>
      <h2>Comment ID: {id}</h2>
      <CommentForm />
    </div>
  );
};

export default Comment;
