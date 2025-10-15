import styles from './App.module.css';
import Header from './components/header/Header';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
