import styles from './App.module.css';
import Header from './components/header/Header';
import Body from './components/body/Body';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Body />
    </div>
  );
}

export default App;
