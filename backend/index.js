import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173', 
        'X-Title': 'Portfolio-AI-Assistant',      
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ГЛОБАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ ПАМЯТИ
// Сервер будет хранить здесь ID последней сработавшей модели, пока не перезагрузится
let lastWorkingModel = null; 

async function getWorkingFreeModels() {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/models');
        const data = await response.json();
        
        const freeModels = data.data
            .filter(model => model.pricing && model.pricing.prompt === "0" && model.pricing.completion === "0")
            .map(model => model.id);
        
        console.log(`🤖 Найдено актуальных бесплатных моделей: ${freeModels.length}`);
        return freeModels.slice(0, 5); 
    } catch (error) {
        console.error("Ошибка при поиске бесплатных моделей:", error);
        return [];
    }
}

app.post('/api/contact', async (req, res) => {
    try {
        const { name, phone, email, comment } = req.body;

        if (!name || !phone || !email || !comment) {
            return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
        }

        const mailToOwner = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Новая заявка с портфолио от ${name}`,
            text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nКомментарий: ${comment}`
        };

        const mailToUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Ваша заявка успешно отправлена',
            text: `Здравствуйте, ${name}!\n\nСпасибо за ваше обращение. Я получила ваше сообщение и свяжусь с вами в ближайшее время.\n\nВаш комментарий:\n${comment}\n\nС уважением,\nАнастасия Григорьева`
        };

        await transporter.sendMail(mailToOwner);
        await transporter.sendMail(mailToUser);

        res.status(200).json({ message: 'Письма успешно отправлены' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера при отправке письма' });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Пустое сообщение' });
        }

        const systemPrompt = `Ты — виртуальный AI-ассистент на сайте-портфолио Анастасии Григорьевой (Junior Frontend Developer / Fullstack). 
Твоя задача — консультировать рекрутеров, технических специалистов и HR, вежливо, профессионально и лаконично отвечая на вопросы о её опыте, навыках и проектах.

ПРАВИЛА ПОВЕДЕНИЯ:
1. Отвечай СТРОГО на основе предоставленных ниже данных. 
2. Если информации для ответа нет в тексте, скажи: "К сожалению, у меня нет точной информации об этом, но вы можете уточнить это у Анастасии напрямую" и предложи контакты. Ничего не выдумывай (никаких галлюцинаций).
3. Держи ответы краткими (не более 3-4 небольших абзацев), выделяй главное списками для читаемости.
4. Отвечай от первого лица множественного числа ("Мы с Анастасией...") или от третьего лица ("Анастасия обладает...", "У нее есть опыт..."). Не притворяйся человеком.
5. КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО использовать Markdown-разметку (никаких звездочек **, решеток # и прочего). Формируй ответ только как обычный чистый текст.

--- ДАННЫЕ ОБ АНАСТАСИИ ---

КОНТАКТЫ И СВЯЗЬ:
- Предпочитаемый способ связи:  почта email: hryhoryevaa.anastasiya@gmail.com или Telegram (@hnstz)
- Email: hryhoryevaa.anastasiya@gmail.com
- GitHub: https://github.com/hnstz
- Занятость: Готова к полной занятости (40 часов в неделю).

ОБРАЗОВАНИЕ И ЯЗЫКИ:
- Вуз: Санкт-Петербургский политехнический университет Петра Великого (СПбПУ), Физико-механический институт.
- Специальность: Прикладная математика и информатика (Системное программирование).
- Статус: Студентка 3 курса, год окончания — 2027.
- Английский: B2 (свободное чтение профильных статей и документации).
- Немецкий: A2.

ТЕХНИЧЕСКИЕ НАВЫКИ (Стек):
- Core: JavaScript (ES6+), TypeScript, React, HTML5, CSS3 (BEM, Grid, Flexbox).
- Tools & Build: Vite, Webpack, Git, GitHub, Docker, Docker Compose, Chrome DevTools, Figma.
- Architecture & Patterns: REST API, ООП, CI/CD, Unit Testing.
- State Management: Redux, Mobx.
- Backend & Additional: Node.js (Express), Python (Pandas, Matplotlib, NumPy), C++, SQL (PostgreSQL, SQLite), Алгоритмы и структуры данных.

ОПЫТ РАБОТЫ (Общий стаж 1 год 5 месяцев):
1. Командный проект (MVP стартапа "Uniflow") | Frontend-разработчик (React) | Янв 2026 — Май 2026 (5 мес).
Разработка SPA-приложения (Task Tracker). Спроектировала компонентную архитектуру (авторизация, дашборд, календарь). Адаптивная верстка без UI-библиотек (CSS-переменные, Grid, Flexbox, BEM).
2. Фриланс (Kwork) | Frontend-разработчик | Янв 2025 — Май 2026 (1 год 5 мес).
Поддержка и развитие веб-приложений (от Drupal 7 до React). Выявление багов, рефакторинг чужого кода, адаптивное решение нестандартных задач.
3. Оператор Газпром ИД | Frontend-разработчик (Fullstack) | Янв 2025 — Авг 2025 (8 мес).
Визуализация данных (построение графиков с выделением аномалий), интеграция REST API (Telegram-алерты), очистка данных (Python, pandas), разработка документации (Jupyter, Colab). Работа в кросс-функциональной команде.

КЛЮЧЕВЫЕ ПРОЕКТЫ (Портфолио):
- Выбор портфеля Марковица: SPA на React, REST API, графики Recharts для анализа рисков и доходности акций на основе математической оптимизации.
- User Database API: Fullstack-проект (React/Vite + Node.js/SQLite). Серверная пагинация, Docker-контейнеризация, тесты.
- RAG-система (Обучающая платформа): SPA на чистом JS (без фреймворков), интеграция LLM через REST API, Mobile First верстка, мокирование данных.
- JS-приложения и верстка: Панель администратора, интерактивные игры (крестики-нолики, калькулятор), Landing-pages.
- Академические проекты: Telegram-bot на Python (aiogram, PostgreSQL) для продажи билетов; консольные игры (Арканоид) на C++ (SFML).

ДОПОЛНИТЕЛЬНОЕ РАЗВИТИЕ:
- Регулярная практика алгоритмов на LeetCode.
- Прохождение The Odin Project (open-source курс).
- Изучение серии книг «You Don't Know JS» (Кайл Симпсон).
- Уверенная работа с первоисточниками: MDN Web Docs, W3C.`;

        let reply = null;

        if (lastWorkingModel) {
            console.log(`🧠 Помню рабочую модель: ${lastWorkingModel}. Пробую её первой...`);
            try {
                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: message }
                    ],
                    model: lastWorkingModel,
                    temperature: 0.5,
                    max_tokens: 250,
                });

                reply = completion.choices[0].message.content;
                console.log(`✅ УСПЕХ! Кэшированная модель ${lastWorkingModel} всё ещё работает.`);
            } catch (error) {
                console.warn(`❌ Старая модель ${lastWorkingModel} отвалилась. Запускаю поиск новых...`);
                lastWorkingModel = null;
            }
        }

        if (!reply) {
            const models = await getWorkingFreeModels();

            if (models.length === 0) {
                return res.status(503).json({ error: 'Сервер OpenRouter не отвечает. Попробуйте позже.' });
            }

            for (const model of models) {
                try {
                    console.log(`Пробую новую нейросеть: ${model}...`);
                    const completion = await openai.chat.completions.create({
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: message }
                        ],
                        model: model,
                        temperature: 0.5,
                        max_tokens: 250,
                    });

                    reply = completion.choices[0].message.content;
                    
                    lastWorkingModel = model; 
                    console.log(`✅ УСПЕХ! Новая рабочая нейросеть: ${model}. Запомнил её.`);
                    break; 
                } catch (modelError) {
                    console.warn(`❌ ${model} недоступна (статус ${modelError.status})`);
                }
            }
        }

        if (!reply) {
            return res.status(503).json({
                error: 'Все бесплатные AI-модели сейчас перегружены. Пожалуйста, попробуйте позже.'
            });
        }

        reply = reply.replace(/\*/g, '');

        res.status(200).json({ reply });
    } catch (error) {
        console.error("Глобальная ошибка сервера:", error);
        res.status(500).json({ error: 'Ошибка при обращении к AI' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});