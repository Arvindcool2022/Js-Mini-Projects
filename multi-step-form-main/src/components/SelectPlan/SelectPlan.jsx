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
      <h1>Select your plan</h1>
      <p className={styles.subtitle}>
        You have the option of monthly or yearly billing.
      </p>
      <div className={styles.plans}>
        {PLANS.map(item => (
          <div
            onClick={() => {
              if (item.name !== plan) setPlan(item.name);
            }}
            className={styles.card}
            style={
              item.name === plan
                ? {
                    borderColor: 'var(--Purplish-blue)',
                    backgroundColor: 'var(--Alabaster)',
                    cursor: 'auto'
                  }
                : {}
            }
          >
            {...item.icon}
            <p className={styles.name}>{item.name}</p>
            <p className={styles.price}>
              {isYearly ? `$${item.price * 10}/yr` : `$${item.price}/mo`}
            </p>
            {isYearly && <p className={styles.year}>2 months free</p>}
          </div>
        ))}
      </div>
      <div className={styles.toggleDiv}>
        <p style={!isYearly ? {} : { color: 'hsl(228, 100%, 84%)' }}>Monthly</p>
        <Toggle
          backgroundColorChecked={'hsl(213, 96%, 18%)'}
          backgroundColorUnchecked={'hsl(213, 96%, 18%)'}
          checked={isYearly}
          height={24}
          width={48}
          sliderHeight={16}
          sliderWidth={16}
          translate={22}
          onChange={() => {
            setIsYearly(p => !p);
          }}
        />
        <p style={isYearly ? {} : { color: 'hsl(228, 100%, 84%)' }}>Yearly</p>
      </div>
      <div className={styles.buttonGrp}>
        <button className={styles.link} onClick={() => setStep(1)}>
          Go Back
        </button>
        <button className={styles.btn} onClick={() => setStep(3)}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default SelectPlan;
