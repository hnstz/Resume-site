import styles from './Info.module.scss';

export const Info = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Информация о себе</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Стек технологий</h3>
            <p>[Здесь будет твой список технологий, языков и библиотек]</p>
          </div>
          <div className={styles.card}>
            <h3>Опыт</h3>
            <p>[Здесь будет описание твоего коммерческого или учебного опыта]</p>
          </div>
          <div className={styles.card}>
            <h3>Направления разработки</h3>
            <p>[Здесь будет описание того, чем тебе нравится заниматься]</p>
          </div>
        </div>
      </div>
    </section>
  );
};