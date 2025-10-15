import styles from './PostList.module.css';
import Post from './Post';

const PostList = () => {
  return (
    <div className={styles.PostList}>
      <h1>Post List</h1>
      <Post />
    </div>
  );
};

export default PostList;
