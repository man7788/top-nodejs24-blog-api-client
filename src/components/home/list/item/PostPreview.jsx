import styles from './PostPreview.module.css';
import { Link } from 'react-router';

const Post = ({ id, title, created }) => {
  return (
    <div className={styles.PostPreview}>
      <Link to={`/posts/${id}`}>
        <h2>{title}</h2>
      </Link>
      {created}
    </div>
  );
};

export default Post;
