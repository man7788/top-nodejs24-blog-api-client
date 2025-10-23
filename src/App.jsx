import styles from './App.module.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
