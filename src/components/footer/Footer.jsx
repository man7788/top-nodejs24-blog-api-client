import styles from './Footer.module.css';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <nav className={styles.nav}>
        <Link className={styles.link} to="/">
          Blog
        </Link>
        <Link className={styles.link} to="/about">
          About
        </Link>
        <Link className={styles.link} to="/contact">
          Contact
        </Link>
      </nav>
      <div className={styles.copyright}>© 2025 All rights reserved</div>
    </footer>
  );
};

export default Footer;
