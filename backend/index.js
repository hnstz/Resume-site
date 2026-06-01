import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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
      text: `Здравствуйте, ${name}!\n\nСпасибо за ваше обращение.\n\nВаш комментарий:\n${comment}\n\nС уважением,\nАнастасия Григорьева`
    };

    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToUser);

    res.status(200).json({ message: 'Письма успешно отправлены' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера при отправке письма' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});