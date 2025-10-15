import styles from './Post.module.css';
import { useParams } from 'react-router';

const Post = () => {
  const { id } = useParams();

  return (
    <div className={styles.Post}>
      <h1>Post ID: {id}</h1>
    </div>
  );
};

export default Post;
