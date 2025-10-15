import styles from './Home.module.css';
import HomeList from './list/HomeList';

const Home = () => {
  return (
    <div className={styles.Home}>
      <HomeList />
    </div>
  );
};

export default Home;
