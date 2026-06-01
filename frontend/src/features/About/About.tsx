import styles from './About.module.scss';

export const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>Обо мне и стеке</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Stack</h3>
            <p>JavaScript (ES6+), TypeScript, React, Vite, SCSS, Node.js</p>
          </div>
          <div className={styles.card}>
            <h3>Architecture</h3>
            <p>FSD / Component-based, Docker, Webpack</p>
          </div>
        </div>
      </div>
    </section>
  );
};