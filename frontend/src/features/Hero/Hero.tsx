import styles from './Hero.module.scss';
import { Button } from '../../components/Button/Button';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Frontend Developer</h1>
        <p className={styles.subtitle}>
          Создаю надежные веб-приложения на React и TypeScript
        </p>
        <div className={styles.actions}>
          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Связаться со мной
          </Button>
          <Button variant="secondary">
            Смотреть проекты
          </Button>
        </div>
      </div>
    </section>
  );
};