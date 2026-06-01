import styles from './Info.module.scss';

export const Info = () => {
  const skills = {
    frontend: ["JavaScript (ES6+)", "TypeScript", "React", "Redux", "MobX", "HTML5", "CSS3", "BEM", "Flexbox", "Grid", "Vite", "Webpack"],
    backend: ["Node.js (Express)", "REST API", "SQL (PostgreSQL, SQLite)"],
    devops: ["Docker", "Docker Compose", "Git", "GitHub", "Unit Testing", "Chrome DevTools", "Jupyter Notebook",],
    academic: ["Python (Pandas, NumPy, Matplotlib)", "Алгоритмы и структуры данных"]
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Информация о себе</h2>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.wideCard}`}>
            <h3>Стек технологий</h3>
            <div className={styles.skillsGroups}>
              <div className={styles.skillGroup}>
                <h4>Frontend Core</h4>
                <div className={styles.tags}>
                  {skills.frontend.map(item => <span key={item} className={styles.tag}>{item}</span>)}
                </div>
              </div>
              <div className={styles.skillGroup}>
                <h4>Backend & Databases</h4>
                <div className={styles.tags}>
                  {skills.backend.map(item => <span key={item} className={styles.tag}>{item}</span>)}
                </div>
              </div>
              <div className={styles.skillGroup}>
                <h4>DevOps & Tools</h4>
                <div className={styles.tags}>
                  {skills.devops.map(item => <span key={item} className={styles.tag}>{item}</span>)}
                </div>
              </div>
              <div className={styles.skillGroup}>
                <h4>Аналитика & Алгоритмы</h4>
                <div className={styles.tags}>
                  {skills.academic.map(item => <span key={item} className={styles.tag}>{item}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Образование</h3>
            <div className={styles.education}>
              <p className={styles.univer}>СПбПУ им. Петра Великого</p>
              <p className={styles.faculty}>Физико-механический институт</p>
              <p className={styles.specialty}>Прикладная математика и информатика (Системное программирование)</p>
              <p className={styles.year}>3 курс (выпуск 2027)</p>
            </div>

            <h3 className={styles.subTitle}>Языки</h3>
            <div className={styles.languages}>
              <p><strong>Английский:</strong> B2 (свободное чтение профильных статей и документации)</p>
              <p><strong>Немецкий:</strong> A2</p>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Обучение и развитие</h3>
            <ul className={styles.learningList}>
              <li><strong>The Odin Project:</strong> Изучение HTML5, CSS3, Vanilla JS и React по комплексному open-source курсу с упором на практику.</li>
              <li><strong>LeetCode:</strong> Регулярное решение алгоритмических задач для тренировки инженерного мышления.</li>
              <li><strong>Литература:</strong> Систематический разбор нюансов языка по серии книг «You Don't Know JS» Кайла Симпсона.</li>
              <li><strong>Документация:</strong> Постоянное изучение спецификаций и первоисточников через MDN Web Docs и W3C.</li>
            </ul>
            <h3 className={styles.subTitle}>Направление разработки</h3>
            <p>Frontend / Fullstack разработка</p>
          </div>
        </div>
      </div>
    </section>
  );
};