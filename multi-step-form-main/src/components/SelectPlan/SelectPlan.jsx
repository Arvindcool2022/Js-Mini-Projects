import { AppContext } from '../../utils/StepContext';
import { useContext } from 'react';
import styles from './SelectPlan.module.scss';

const SelectPlan = () => {
  const { setStep, isYearly } = useContext(AppContext);
  return (
    <div className={styles}>
      plan
      <button onClick={() => setStep(2)}>Go back</button>
      <button onClick={() => setStep(4)}>next</button>
    </div>
  );
};

export default SelectPlan;
