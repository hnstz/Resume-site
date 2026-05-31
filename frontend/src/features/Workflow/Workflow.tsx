import styles from './Workflow.module.scss';

export const Workflow = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Как я работаю</h2>
        <div className={styles.content}>
          <div className={styles.block}>
            <h3>Подход к задачам</h3>
            <ul className={styles.list}>
              <li>[Опиши, как ты декомпозируешь задачи]</li>
              <li>[Опиши свое отношение к код-ревью и тестированию]</li>
              <li>[Опиши, как планируешь архитектуру перед написанием кода]</li>
            </ul>
          </div>
          <div className={styles.block}>
            <h3>Использование AI в работе</h3>
            <ul className={styles.list}>
              <li>[Пример 1: генерация рутинных типов или бойлерплейта]</li>
              <li>[Пример 2: поиск оптимальных алгоритмов]</li>
              <li>[Пример 3: рефакторинг и написание документации]</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};