import styles from './Comment.module.css';

const Comment = ({ id }) => {
  return (
    <div className={styles.Comment}>
      <h2>Comment ID: {id}</h2>
    </div>
  );
};

export default Comment;
