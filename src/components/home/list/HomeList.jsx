import styles from './HomeList.module.css';
import PostPreview from './item/PostPreview';
import usePostList from '../../../hooks/usePostList';

const HomeList = () => {
  const { posts, loading, error } = usePostList();

  if (loading) return <h2 className={styles.loading}>Loading...</h2>;

  if (error)
    return <h2 className={styles.error}>A network error was encountered</h2>;

  return (
    <div className={styles.HomeList}>
      {posts.map((post) => (
        <PostPreview
          key={post.id}
          id={post.id}
          title={post.title}
          created={post.createdAt}
        />
      ))}
    </div>
  );
};

export default HomeList;
