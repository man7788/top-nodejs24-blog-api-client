import styles from './Home.module.css';
import PostList from './posts/PostList';

const Home = () => {
  return (
    <div className={styles.Home}>
      <PostList />
    </div>
  );
};

export default Home;
