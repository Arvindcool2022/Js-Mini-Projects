import styles from './AddOns.module.scss';
import { AppContext } from '../../utils/StepContext';
import { useContext } from 'react';
import Toggle from 'react-styled-toggle';

const AddOns = () => {
  const { setStep, isYearly, setIsYearly } = useContext(AppContext);
  console.log(isYearly);
  return (
    <div className={styles.info}>
      <Toggle
        backgroundColorChecked={'red'}
        backgroundColorUnchecked={'red'}
        onChange={() => {
          setIsYearly(p => !p);
        }}
      />
      addon
      <button onClick={() => setStep(1)}>Go back</button>
      <button onClick={() => setStep(3)}>next</button>
    </div>
  );
};

export default AddOns;
