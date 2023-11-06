import { AppContext } from '../../utils/StepContext';
import { useContext } from 'react';
import styles from './AddOnServices.module.scss';
import { ADD_ON } from '../../utils/constant';

const AddOnServices = () => {
  const { setStep, isYearly, addOn, setAddOn } = useContext(AppContext);

  // console.log(addOn);

  return (
    <div className={styles}>
      {ADD_ON.map(x => (
        <div key={x.name}>
          <input
            type="checkbox"
            id={x.name}
            name={x.name}
            value={x.name}
            checked={addOn[x.name] || false}
            onChange={() => {
              setAddOn(prevAddOn => ({
                ...prevAddOn,
                [x.name]: !prevAddOn[x.name]
              }));
            }}
          />
          <div>
            <label for={`#${x.name}`}>{x.name}</label>
            <p>{x.des}</p>
          </div>
          <p>{isYearly ? x.price * 10 : x.price}</p>
        </div>
      ))}
      <button onClick={() => setStep(2)}>Go back</button>
      <button onClick={() => setStep(4)}>next</button>
    </div>
  );
};

export default AddOnServices;
