import { useState } from 'react';
import styles from './App.module.scss';
import {
  YourInfo,
  AddOns,
  SelectPlan,
  Summary,
  ThankYou,
  Navigation
} from './components';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <Navigation />
        <YourInfo />
        <AddOns />
        <SelectPlan />
        <Summary />
        <ThankYou />
      </section>
    </main>
  );
}

export default App;
