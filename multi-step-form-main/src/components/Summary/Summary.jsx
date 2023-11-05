import { AppContext } from '../../utils/StepContext';
import { useContext } from 'react';
import styles from './Summary.module.scss';

const Summary = () => {
  const { setStep, isYearly, setIsYearly } = useContext(AppContext);
  return (
    <div className={styles}>
      Summary
      <button onClick={() => setIsYearly(p => !p)}>Change</button>
      <button onClick={() => setStep(3)}>Go back</button>
      <button onClick={() => setStep(5)}>next</button>
    </div>
  );
};

export default Summary;
