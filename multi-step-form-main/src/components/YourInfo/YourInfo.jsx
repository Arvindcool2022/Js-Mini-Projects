import { useContext, useState } from 'react';
import { AppContext } from '../../utils/StepContext';
import styles from './YourInfo.module.scss';
const inputField = [
  {
    id: 1,
    name: 'name',
    type: 'text',
    placeholder: 'e.g. Stephen King',
    label: 'name'
  },
  {
    id: 2,
    name: 'email',
    type: 'email',
    placeholder: 'e.g. stephenking@lorem.com',
    label: 'email address'
  },
  {
    id: 3,
    name: 'phone',
    type: 'number',
    placeholder: 'e.g. +1 234 567 890',
    label: 'phone number'
  }
];
const YourInfo = () => {
  const { setStep } = useContext(AppContext);
  const [values, setValues] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false
  });

  const validateInputs = e => {
    e.preventDefault();
    const newErrors = {};
    let hasErrors = false;

    // Validate name
    if (!values.name.trim()) {
      newErrors.name = true;
      hasErrors = true;
    } else {
      newErrors.name = false;
    }

    // Validate email
    if (!values.email.trim() || !isValidEmail(values.email)) {
      newErrors.email = true;
      hasErrors = true;
    } else {
      newErrors.email = false;
    }

    // Validate phone
    if (!values.phone.trim()) {
      newErrors.phone = true;
      hasErrors = true;
    } else {
      newErrors.phone = false;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));

    if (!hasErrors) {
      setStep(2);
    }
  };

  const isValidEmail = email => {
    // Implement your email validation logic here
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className={styles.info}>
      <h1>Personal info</h1>
      <p className={styles.subtitles}>
        Please provide your name, email address, and phone number.
      </p>
      <form className={styles.form}>
        {inputField.map(item => (
          <div key={item.id} className="">
            <div className={styles.label}>
              <label htmlFor={`#${item.name}`}>{item.label}</label>
              <p
                className={styles.err}
                style={!errors[item.name] ? { visibility: 'hidden' } : {}}
              >
                this field is required
              </p>
            </div>
            <input
              className={styles.input}
              id={item.name}
              name={item.name}
              placeholder={item.placeholder}
              type={item.type}
              value={values[item.name]}
              onChange={e =>
                setValues({ ...values, [item.name]: e.target.value })
              }
              // required={true}
              style={
                errors[item.name]
                  ? { borderColor: 'var(--Strawberry-red)' }
                  : {}
              }
            />
          </div>
        ))}
        <button className={styles.button} onClick={validateInputs}>
          Next Step
        </button>
      </form>
    </div>
  );
};

export default YourInfo;
