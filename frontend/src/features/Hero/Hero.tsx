import styles from './Hero.module.scss';
import { Button } from '../../components/Button/Button';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>AI Frontend / Fullstack Developer</h1>
        <p className={styles.subtitle}>
          Анастасия Григорьева
        </p>
        <div className={styles.actions}>
          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Связаться со мной
          </Button>
        </div>
      </div>
    </section>
  );
};