import { AppContext } from '../../utils/StepContext';
import { useContext } from 'react';
import styles from './Summary.module.scss';
import { PLANS, ADD_ON } from '../../utils/constant';

const Summary = () => {
  const { setStep, isYearly, setIsYearly, plan, addOn } =
    useContext(AppContext);
  return (
    <div className={styles}>
      <div>
        <p>{plan}</p>
        <button
          onClick={() => {
            setIsYearly(p => !p);
          }}
        >
          change
        </button>

        <div>
          {Object.keys(addOn).map(
            property => addOn[property] && <p key={property}>{property}</p>
          )}
        </div>
      </div>
      <button onClick={() => setIsYearly(p => !p)}>Change</button>
      <button onClick={() => setStep(3)}>Go back</button>
      <button onClick={() => setStep(5)}>next</button>
    </div>
  );
};

export default Summary;
