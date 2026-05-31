import styles from './Projects.module.scss';

export const Projects = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Кейсы и опыт</h2>
        <div className={styles.grid}>
          <div className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <h3>[Название проекта 1]</h3>
              <span className={styles.badge}>[Учебный/Реальный]</span>
            </div>
            <p className={styles.description}>
              [Краткое описание сути проекта и бизнес-логики]
            </p>
            <div className={styles.role}>
              <strong>Что делала лично:</strong>
              <p>[Настройка сборки, реализация конкретных фич, верстка...]</p>
            </div>
          </div>

          <div className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <h3>[Название проекта 2]</h3>
              <span className={styles.badge}>[Учебный/Реальный]</span>
            </div>
            <p className={styles.description}>
              [Краткое описание сути проекта и бизнес-логики]
            </p>
            <div className={styles.role}>
              <strong>Что делала лично:</strong>
              <p>[Интеграция с API, создание UI-kit, оптимизация рендеринга...]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};