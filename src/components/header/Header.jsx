import styles from './Header.module.css';
import { Link } from 'react-router';

const Header = () => {
  return (
    <div className={styles.Header}>
      <h1 className={styles.nav}>
        <Link className={styles.logo} to="/">
          Blog
        </Link>
        <div className={styles.linkDiv}>
          <Link className={styles.link} to="/">
            Posts
          </Link>
          <Link className={styles.link} to="/">
            About
          </Link>
          <Link className={styles.link} to="/">
            Contact
          </Link>
        </div>
      </h1>
    </div>
  );
};

export default Header;
