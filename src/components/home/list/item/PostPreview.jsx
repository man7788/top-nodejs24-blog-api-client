import styles from './PostPreview.module.css';
import { Link } from 'react-router';
import dateFormatter from '../../../../utils/dateFormatter';

const Post = ({ id, title, created }) => {
  const formattedDate = dateFormatter(created);

  return (
    <li className={styles.PostPreview}>
      <Link className={styles.link} to={`/posts/${id}`}>
        <h2 className={styles.title}>{title}</h2>
      </Link>
      <div className={styles.date}>{formattedDate}</div>
    </li>
  );
};

export default Post;
