import { IconThankYou } from '../ReactSvg';
import styles from './ThankYou.module.scss';

const ThankYou = () => {
  return (
    <div className={styles.container}>
      <IconThankYou />
      <h1>Thank you!</h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
};

export default ThankYou;
