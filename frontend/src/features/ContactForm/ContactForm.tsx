import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ContactForm.module.scss';
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import { Button } from '../../components/Button/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^\+?[0-9\s\-()]{10,20}$/, 'Введите корректный номер телефона'),
  email: z.string().email('Некорректный формат email'),
  comment: z.string().min(10, 'Комментарий должен содержать минимум 10 символов'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Отправка на сервер:', data);
    } catch (error) {
      setServerError('Произошла ошибка при отправке. Попробуйте позже.');
    }
  };

  if (isSubmitSuccessful) {
    return (
      <section id="contact" className={styles.section}>
        <div className={styles.successMessage}>
          <h3>Спасибо за обращение!</h3>
          <p>Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Связаться со мной</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Имя, фамилия"
            placeholder="Имя Фамилия"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Телефон"
            placeholder="+7 (999) 000-00-00"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            label="Email"
            placeholder="example@mail.com"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Textarea
            label="Комментарий"
            placeholder="Любой Ваш комментарий"
            error={errors.comment?.message}
            {...register('comment')}
          />
          
          {serverError && <div className={styles.serverError}>{serverError}</div>}
          
          <Button type="submit" isLoading={isSubmitting}>
            Отправить сообщение
          </Button>
        </form>
      </div>
    </section>
  );
};