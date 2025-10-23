import styles from './Footer.module.css';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.nav}>
        <Link className={styles.link} to="/">
          Blog
        </Link>
        <Link className={styles.link} to="/">
          About
        </Link>
        <Link className={styles.link} to="/">
          Contact
        </Link>
      </div>
      <div className={styles.copyright}>© 2025 All rights reserved </div>
    </div>
  );
};

export default Footer;
