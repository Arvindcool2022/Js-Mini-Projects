import { useContext } from 'react';
import { AppContext } from '../../utils/StepContext';
import styles from './YourInfo.module.scss';
const YourInfo = () => {
  const { setStep } = useContext(AppContext);
  return (
    <div className={styles.info}>
      <input type="text" />
      <input type="email" />
      <input type="number" />
      <button onClick={() => setStep(2)}>next</button>
    </div>
  );
};

export default YourInfo;
