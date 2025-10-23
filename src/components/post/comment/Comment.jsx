import styles from './Comment.module.css';
import dateFormatter from '../../../utils/dateFormatter';

const Comment = ({ name, content, created }) => {
  const formattedDate = dateFormatter(created);

  return (
    <div className={styles.Comment}>
      <h5 className={styles.author}>
        {name} • <span className={styles.createdAt}>{formattedDate}</span>
      </h5>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default Comment;
