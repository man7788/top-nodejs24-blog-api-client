import styles from './Header.module.css';
import { Link } from 'react-router';

const Header = () => {
  return (
    <div className={styles.Header}>
      <h1>
        <Link to="/">Blog</Link>
      </h1>
    </div>
  );
};

export default Header;
