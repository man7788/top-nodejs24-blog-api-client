import styles from './Header.module.css';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.headerChild}>
        <Link className={styles.logo} to="/">
          Blog
        </Link>
        <nav className={styles.nav}>
          <Link className={styles.link} to="/">
            Posts
          </Link>
          <Link className={styles.link} to="/about">
            About
          </Link>
          <Link className={styles.link} to="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
