import styles from './HomeList.module.css';
import PostPreview from './list-item/PostPreview';

const HomeList = () => {
  return (
    <div className={styles.PostList}>
      <h1>Home List</h1>
      <PostPreview />
    </div>
  );
};

export default HomeList;
