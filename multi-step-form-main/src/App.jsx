import { useState } from 'react';
import { AppContext } from './utils/StepContext';
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
  const [step, setStep] = useState(1);
  const [isYearly, setIsYearly] = useState(false);

  return (
    <AppContext.Provider value={{ setStep, isYearly, setIsYearly }}>
      <main className={styles.main}>
        <section className={styles.wrapper}>
          <Navigation />
          <div>
            {step === 1 && <YourInfo />}
            {step === 2 && <AddOns />}
            {step === 3 && <SelectPlan />}
            {step === 4 && <Summary />}
            {step === 5 && <ThankYou />}
          </div>
        </section>
      </main>
    </AppContext.Provider>
  );
}

export default App;
