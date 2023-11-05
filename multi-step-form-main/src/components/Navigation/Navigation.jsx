import styles from './Navigation.module.scss';
import { BgSidebarDesktop, BgSidebarMobile } from '../ReactSvg';
const steps = ['your info', 'Select plan', 'Add-ons', 'Summary'];

const Navigation = () => {
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
            <p className={styles.num}>{index + 1}</p>
            <div className={styles.name}>
              <p>{`Step ${index + 1}`}</p>
              <p>{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
