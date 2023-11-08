import { AppContext } from '../../utils/StepContext';
import { useContext } from 'react';
import styles from './Summary.module.scss';
import { PLANS, ADD_ON } from '../../utils/constant';

const Summary = () => {
  const { setStep, isYearly, setIsYearly, plan, addOn } =
    useContext(AppContext);

  const [selectedPlan] = PLANS.filter(obj => obj.name === plan);

  const selectedAddOns = Object.keys(addOn).filter(service => addOn[service]);

  const selectedAddOnDetails = ADD_ON.filter(addon =>
    selectedAddOns.includes(addon.name)
  );
  const totalCost =
    selectedPlan.price +
    selectedAddOnDetails.reduce((a, c) => {
      return a + c.price;
    }, 0);

  return (
    <div className={styles.section}>
      <h1>Finishing up</h1>
      <p className={styles.subtitle}>
        Double-check everything looks OK before confirming
      </p>
      <div className={styles.main}>
        <div className={styles.plan}>
          <div className={styles.name}>
            <p>{plan}</p>
            <a
              onClick={() => {
                setIsYearly(p => !p);
              }}
            >
              change
            </a>
          </div>
          <p>
            {isYearly
              ? `$${selectedPlan.price * 10}/yr`
              : `$${selectedPlan.price}/mo`}
          </p>
        </div>
        <div className={styles.addon}>
          {selectedAddOnDetails.map(obj => (
            <div key={obj.name} className={styles.each}>
              <p className={styles.name}>{obj.name}</p>
              <p className={styles.price}>
                {isYearly ? `+$${obj.price * 10}/yr` : `+$${obj.price}/mo`}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.total}>
          <p className={styles.name}>
            Total {isYearly ? '(per year)' : '(per month)'}
          </p>
          <p className={styles.price}>
            {isYearly ? `$${totalCost * 10}/yr` : `$${totalCost}/mo`}
          </p>
        </div>
      </div>
      <div className={styles.buttonGrp}>
        <button onClick={() => setStep(3)}>Go Back</button>
        <button onClick={() => setStep(5)}>Confirm</button>
      </div>
    </div>
  );
};

export default Summary;
