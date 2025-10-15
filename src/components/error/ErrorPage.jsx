import styles from './ErrorPage.module.css';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className={styles.ErrorPage}>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
