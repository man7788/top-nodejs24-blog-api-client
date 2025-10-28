import styles from './Home.module.css';
import HomeList from './list/HomeList';

const Home = () => {
  return (
    <main className={styles.Home}>
      <HomeList />
    </main>
  );
};

export default Home;
