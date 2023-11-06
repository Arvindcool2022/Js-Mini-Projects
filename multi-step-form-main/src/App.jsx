import { useState } from 'react';
import { AppContext } from './utils/StepContext';
import styles from './App.module.scss';
import {
  YourInfo,
  SelectPlan,
  AddOnServices,
  Summary,
  ThankYou,
  Navigation
} from './components';
import { ADD_ON } from './utils/constant';

function App() {
  const [step, setStep] = useState(1);
  const [isYearly, setIsYearly] = useState(false);
  const [plan, setPlan] = useState('arcade');
  const initialAddOns = {};
  ADD_ON.forEach(addon => {
    initialAddOns[addon.name] = false;
  });

  const [addOn, setAddOn] = useState(initialAddOns);

  return (
    <AppContext.Provider
      value={{
        step,
        setStep,
        isYearly,
        setIsYearly,
        plan,
        setPlan,
        setAddOn,
        addOn
      }}
    >
      <main className={styles.main}>
        <section className={styles.wrapper}>
          <Navigation />
          <div className={styles.field}>
            <div className={styles.container}>
              {step === 1 && <YourInfo />}
              {step === 2 && <SelectPlan />}
              {step === 3 && <AddOnServices />}
              {step === 4 && <Summary />}
              {step === 5 && <ThankYou />}
            </div>
          </div>
        </section>
      </main>
    </AppContext.Provider>
  );
}

export default App;
