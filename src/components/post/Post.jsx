import styles from './Post.module.css';
import { useParams } from 'react-router';
import Comment from './comment/Comment';

const Post = () => {
  const { id } = useParams();

  const comments = [{ id: 1 }];

  return (
    <div className={styles.Post}>
      <h1>Post ID: {id}</h1>
      {comments.map((comment) => (
        <Comment key={comment.id} id={comment.id} />
      ))}
    </div>
  );
};

export default Post;
