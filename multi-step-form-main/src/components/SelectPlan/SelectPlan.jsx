import styles from './SelectPlan.module.scss';
import { AppContext } from '../../utils/StepContext';
import { useContext } from 'react';
import Toggle from 'react-styled-toggle';
import { PLANS } from '../../utils/constant';

const SelectPlan = () => {
  const { setStep, isYearly, setIsYearly, plan, setPlan } =
    useContext(AppContext);
  console.log(plan);
  return (
    <div className={styles.info}>
      <Toggle
        backgroundColorChecked={'red'}
        backgroundColorUnchecked={'red'}
        checked={isYearly}
        onChange={() => {
          setIsYearly(p => !p);
        }}
      />
      <p>plan</p>
      {PLANS.map(x =>
        x.name !== plan ? (
          <div onClick={() => setPlan(x.name)} className={styles.card}>
            <p>{x.name}</p>
            <p>{isYearly ? x.price * 10 : x.price}</p>
            {isYearly && <p>free</p>}
          </div>
        ) : (
          <div
            className={styles.card}
            style={{ borderColor: 'red', cursor: 'auto' }}
          >
            <p>{x.name}</p>
            <p>{isYearly ? x.price * 10 : x.price}</p>
            {isYearly && <p>free</p>}
          </div>
        )
      )}
      <button onClick={() => setStep(1)}>Go back</button>
      <button
        onClick={() => {
          if (plan) setStep(3);
          else console.log('select a plan');
        }}
      >
        next
      </button>
    </div>
  );
};

export default SelectPlan;
