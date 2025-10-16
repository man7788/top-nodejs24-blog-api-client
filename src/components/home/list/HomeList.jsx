import styles from './HomeList.module.css';
import PostPreview from './item/PostPreview';
import usePostList from '../../../hooks/usePostList';

const HomeList = () => {
  const { posts, loading, error } = usePostList();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>A network error was encountered</p>;

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
