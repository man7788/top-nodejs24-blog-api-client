import styles from './Comment.module.css';
import dateFormatter from '../../../utils/dateFormatter';

const Comment = ({ id, name, content, created }) => {
  const formattedDate = dateFormatter(created);

  return (
    <article className={styles.Comment} key={id}>
      <h5 className={styles.author}>
        {name} • <span className={styles.createdAt}>{formattedDate}</span>
      </h5>
      <p className={styles.content}>{content}</p>
    </article>
  );
};

export default Comment;
