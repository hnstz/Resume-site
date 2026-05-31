import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from '../Input/Input.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <label className={styles.label}>{label}</label>
        <textarea
          ref={ref}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          style={{ resize: 'vertical', minHeight: '100px' }}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';