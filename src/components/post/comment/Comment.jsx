import styles from './Comment.module.css';

const Comment = ({ name, content, created }) => {
  return (
    <div className={styles.Comment}>
      <h4>{name}</h4>
      <span>{content}</span>
      {created}
    </div>
  );
};

export default Comment;
