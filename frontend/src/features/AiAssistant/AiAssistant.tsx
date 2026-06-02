import { useState } from 'react';
import axios from 'axios';
import styles from './AiAssistant.module.scss';
import { Button } from '../../components/Button/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Привет! Я AI-ассистент Анастасии. Спроси меня о её стеке, образовании или опыте.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await axios.post(`${baseURL}/api/chat`, {
        message: input,
      });
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.data.reply 
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Извините, произошла ошибка соединения с сервером.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Спроси AI-ассистента</h2>
        <div className={styles.chatBox}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.messageWrapper} ${styles[msg.role]}`}
              >
                <div className={styles.bubble}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.messageWrapper} ${styles.assistant}`}>
                <div className={styles.bubble}>...</div>
              </div>
            )}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Например: Какой у Анастасии стек технологий?"
              className={styles.input}
              disabled={isLoading}
            />
            <Button onClick={sendMessage} isLoading={isLoading}>
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};