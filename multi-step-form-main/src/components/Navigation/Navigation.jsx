import styles from './Navigation.module.scss';
import { BgSidebarDesktop, BgSidebarMobile } from '../ReactSvg';
import { useContext } from 'react';
import { AppContext } from '../../utils/StepContext';
const steps = ['your info', 'Select plan', 'Add-ons', 'Summary'];

const Navigation = () => {
  const { step } = useContext(AppContext);
  const stage = step - 1;

  return (
    <div className={styles.Navigation}>
      <div className={styles.desktopImg}>
        <BgSidebarDesktop />
      </div>
      <div className={styles.mobileImg}>
        <BgSidebarMobile />
      </div>
      <div className={styles.container}>
        {steps.map((step, index) => (
          <div key={step} className={styles.step}>
            {stage === index ? (
              <p className={styles.numMark}>{index + 1}</p>
            ) : stage === 4 && index === 3 ? (
              <p className={styles.numMark}>{index + 1}</p>
            ) : (
              <p className={styles.num}>{index + 1}</p>
            )}
            <div className={styles.name}>
              <p>{`Step ${index + 1}`}</p>
              <p className={styles.page}>{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
