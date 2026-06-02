import styles from './Projects.module.scss';

interface ProjectItem {
  title: string;
  badge: string;
  isCommercial: boolean;
  description: string;
  role: string;
  stack: string[];
  links?: {
    live?: string;
    github?: string;
  };
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
}

export const Projects = () => {
  const projectList: ProjectItem[] = [
    {
      title: "Uniflow",
      badge: "MVP Стартапа",
      isCommercial: true,
      description: "SPA-приложение для управления задачами (Task Tracker) в составе кросс-функциональной команды. Система включает интерактивный дашборд и сквозную авторизацию пользователей.",
      role: "Проектировала компонентную архитектуру приложения. Реализовала модули авторизации, дашборда и интерактивного календаря. Выполнила адаптивную верстку без UI-библиотек по методологии BEM.",
      stack: ["React", "JavaScript (ES6+)", "Vite", "HTML5", "CSS3 (BEM, Grid, Flexbox)"],
      links: {
        live: "https://uniflow-gray.vercel.app/",
        github: "https://github.com/anyyaa/task-tracker"
      }
    },
    {
      title: "RAG-система",
      badge: "Обучающая платформа",
      isCommercial: false,
      description: "SPA-интерфейс для системы поиска по документам на базе LLM и интерактивного тренажера. Архитектура клиент-серверного взаимодействия построена через REST API в формате JSON.",
      role: "Разработала интерфейс на чистом JavaScript без использования фреймворков. Реализовала механизм маршрутизации, асинхронный обмен данными с бэкендом (fetch, async/await) и грамотное управление DOM-деревом. Выполнила семантическую адаптивную верстку с применением подхода Mobile First и внедрила режим мокирования данных для автономного тестирования UI и состояний загрузки.",
      stack: ["JavaScript", "REST API", "HTML5", "CSS3 (CSS-переменные)", "Mobile First"],
      links: {
        github: "https://github.com/freak-team/rag-system-interfaces"
      }
    },
    {
      title: "Мониторинг аномалий",
      badge: "Газпром ИД",
      isCommercial: true,
      description: "Система отслеживания и анализа аномалий в потоковых данных в режиме близком к реальному времени. Проект направлен на автоматизацию первичной аналитики временных рядов.",
      role: "Реализовала интерактивное построение графиков временных рядов с выделением аномальных зон. Интегрировала REST API Telegram для мгновенного алертинга об инцидентах. Провела очистку сырых данных.",
      stack: ["Python", "Pandas", "NumPy", "Matplotlib", "REST API", "Jupyter Notebook"],
      links: {
        github: "https://github.com/hnstz/data_anomalies_project"
      }
    },
    {
      title: "Портфель Марковица",
      badge: "MVP Стартапа",
      isCommercial: true,
      description: "Математическое SPA-приложение для выбора оптимального инвестиционного портфеля акций и глубокого анализа финансовых рисков на основе алгоритмов оптимизации.",
      role: "Полностью разработала frontend-часть приложения. Спроектировала архитектуру REST API взаимодействия с бэкендом. Настроила отрисовку матриц рисков и интерактивных графиков доходности через Recharts.",
      stack: ["React", "TypeScript", "Recharts", "REST API", "Vite", "CSS3"],
    },
    {
      title: "User Database API",
      badge: "Fullstack / Pet",
      isCommercial: false,
      description: "Клиент-серверное веб-приложение для администрирования, просмотра, гибкой фильтрации и загрузки списков пользователей.",
      role: "Разработала SPA на React и серверную часть на Node.js. Реализовала эффективную серверную пагинацию (LIMIT и OFFSET) и контроль уникальности данных в SQLite. Настроила Docker контейнеризацию.",
      stack: ["React", "Node.js", "Express", "SQLite", "Docker", "Docker Compose", "Unit Testing"],
      links: {
        github: "https://github.com/hnstz/Random-users-dashboard"
      }
    }
  ];

  const experienceList: ExperienceItem[] = [
    {
      company: "Командный проект (MVP стартапа)",
      role: "Frontend-разработчик (React)",
      period: "Январь 2026 — Май 2026",
      duration: "5 месяцев",
      description: "Проектирование компонентной архитектуры (авторизация, дашборд, календарь). Разработка интерфейсов и адаптивная верстка по методологии BEM с использованием CSS-переменных, Grid и Flexbox."
    },
    {
      company: "Kwork",
      role: "Frontend-разработчик",
      period: "Январь 2025 — Май 2026",
      duration: "1 год и 5 месяцев",
      description: "Комплексная поддержка и рефакторинг веб-приложений от Drupal 7 до React. Устранение багов на живых страницах, оптимизация производительности и адаптивное погружение в чужой код."
    },
    {
      company: "Оператор Газпром ИД",
      role: "Frontend-разработчик",
      period: "Январь 2025 — Август 2025",
      duration: "8 месяцев",
      description: "Визуализация временных рядов и аномальных зон на графиках. Подключение REST API Telegram для автоматического алертинга. Подготовка и очистка сырых данных, ведение технической документации."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ключевые проекты</h2>
        <div className={styles.grid}>
          {projectList.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <h3>{project.title}</h3>
                <span className={`${styles.badge} ${project.isCommercial ? styles.commercial : styles.educational}`}>
                  {project.badge}
                </span>
              </div>
              
              <p className={styles.description}>
                {project.description}
              </p>
              
              <div className={styles.role}>
                <strong>Что делала лично:</strong>
                <p>{project.role}</p>
              </div>

              <div className={styles.techStack}>
                {project.stack.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>{tech}</span>
                ))}
              </div>

              {(project.links?.live || project.links?.github) && (
                <div className={styles.links}>
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" className={styles.linkPrimary}>
                      Live Demo
                    </a>
                  )}
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className={styles.linkSecondary}>
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className={`${styles.title} ${styles.experienceTitle}`}>Практический опыт</h2>
        <div className={styles.timeline}>
          {experienceList.map((exp, index) => (
            <div key={index} className={styles.timelineCard}>
              <div className={styles.timelineHeader}>
                <div>
                  <h3>{exp.company}</h3>
                  <h4>{exp.role}</h4>
                </div>
                <div className={styles.timeBlock}>
                  <span className={styles.period}>{exp.period}</span>
                  <span className={styles.durationBadge}>{exp.duration}</span>
                </div>
              </div>
              <p className={styles.experienceText}>{exp.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.moreProjects}>
          <a 
            href="https://drive.google.com/drive/folders/1r4FzFuU41Mqs5bHbEiagF34q9-tjsRWs" 
            target="_blank" 
            rel="noreferrer" 
            className={styles.driveButton}
          >
            ✦ Смотреть полное портфолио на Google Диске
          </a>
        </div>
      </div>
    </section>
  );
};