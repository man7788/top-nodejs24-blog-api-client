import styles from './HomeList.module.css';
import PostPreview from './item/PostPreview';

const HomeList = () => {
  const posts = [
    {
      id: 1,
      title: 'Title for the first post',
      content: 'Content for the first post.',
      createdAt: '2025-10-15T19:20:06.240Z',
    },
    {
      id: 2,
      title: 'Title for the second post',
      content: 'Content for the second post.',
      createdAt: '2025-10-15T19:20:06.240Z',
    },
  ];

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
