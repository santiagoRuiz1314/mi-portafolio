import React, { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAnalytics } from '@/lib/analytics';
import type { ContactFormData, FormState, FormErrors } from '@/types/global';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<{ success: boolean; message?: string }>;
  className?: string;
  showSubject?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className,
  showSubject = true,
}) => {
  const analytics = useAnalytics();
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, setFormState] = useState<FormState<ContactFormData>>({
    values: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    errors: {},
    touched: {
      name: false,
      email: false,
      subject: false,
      message: false,
    },
    isValid: false,
    isSubmitting: false,
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Validaciones
  const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'El nombre es requerido';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return undefined;

      case 'email':
        if (!value.trim()) return 'El email es requerido';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'El email no es válido';
        return undefined;

      case 'subject':
        if (showSubject && !value.trim()) return 'El asunto es requerido';
        if (showSubject && value.trim().length < 5) return 'El asunto debe tener al menos 5 caracteres';
        return undefined;

      case 'message':
        if (!value.trim()) return 'El mensaje es requerido';
        if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
        if (value.trim().length > 1000) return 'El mensaje no puede exceder 1000 caracteres';
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (values: ContactFormData): FormErrors => {
    const errors: FormErrors = {};
    
    Object.keys(values).forEach((key) => {
      const fieldKey = key as keyof ContactFormData;
      const error = validateField(fieldKey, values[fieldKey]);
      if (error) {
        errors[fieldKey] = error;
      }
    });

    return errors;
  };

  // Handlers
  const handleInputChange = (name: keyof ContactFormData, value: string) => {
    const newValues = { ...formState.values, [name]: value };
    const errors = validateForm(newValues);
    const isValid = Object.keys(errors).length === 0;

    setFormState(prev => ({
      ...prev,
      values: newValues,
      errors,
      isValid,
    }));

    // Limpiar mensaje de estado si el usuario empieza a escribir
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleInputBlur = (name: keyof ContactFormData) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    setFormState(prev => ({
      ...prev,
      touched: {
        name: true,
        email: true,
        subject: true,
        message: true,
      },
    }));

    const errors = validateForm(formState.values);
    
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }));
      analytics.contact.formError('validation');
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      let result;
      
      if (onSubmit) {
        result = await onSubmit(formState.values);
      } else {
        // Default API call
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState.values),
        });

        const data = await response.json();
        result = { success: response.ok, message: data.message };
      }

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || '¡Mensaje enviado exitosamente! Te contactaré pronto.',
        });
        
        // Limpiar formulario
        setFormState({
          values: {
            name: '',
            email: '',
            subject: '',
            message: '',
          },
          errors: {},
          touched: {
            name: false,
            email: false,
            subject: false,
            message: false,
          },
          isValid: false,
          isSubmitting: false,
        });

        analytics.contact.formSubmit();
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error al enviar el mensaje. Intenta nuevamente.',
      });
      analytics.contact.formError('submit');
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const getFieldError = (field: keyof ContactFormData) => {
    return formState.touched[field] && formState.errors[field];
  };

  return (
    <div className={cn('space-y-6 max-w-2xl', className)}>
      {/* Status Message */}
      {submitStatus.type && (
        <div className={cn(
          'p-4 rounded-lg flex items-center space-x-3',
          {
            'bg-green-50 border border-green-200 text-green-800 dark:bg-green-800 dark:border-green-700 dark:text-green-100': submitStatus.type === 'success',
            'bg-red-50 border border-red-200 text-red-800 dark:bg-red-800 dark:border-red-700 dark:text-red-100': submitStatus.type === 'error',
          }
        )}>
          {submitStatus.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{submitStatus.message}</span>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.values.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleInputBlur('name')}
              placeholder="Full Name"
              className={cn(
                'form-input',
                getFieldError('name') && 'border-red-500 focus:border-red-500 focus:ring-red-500'
              )}
              disabled={formState.isSubmitting}
              required
            />
            {getFieldError('name') && (
              <p className="form-error">{getFieldError('name')}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.values.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleInputBlur('email')}
              placeholder="you@email.com"
              className={cn(
                'form-input',
                getFieldError('email') && 'border-red-500 focus:border-red-500 focus:ring-red-500'
              )}
              disabled={formState.isSubmitting}
              required
            />
            {getFieldError('email') && (
              <p className="form-error">{getFieldError('email')}</p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        {showSubject && (
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formState.values.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              onBlur={() => handleInputBlur('subject')}
              placeholder="Subject of your message"
              className={cn(
                'form-input',
                getFieldError('subject') && 'border-red-500 focus:border-red-500 focus:ring-red-500'
              )}
              disabled={formState.isSubmitting}
              required
            />
            {getFieldError('subject') && (
              <p className="form-error">{getFieldError('subject')}</p>
            )}
          </div>
        )}

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formState.values.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onBlur={() => handleInputBlur('message')}
            placeholder="Describe your project or question..."
            className={cn(
              'form-textarea',
              getFieldError('message') && 'border-red-500 focus:border-red-500 focus:ring-red-500'
            )}
            disabled={formState.isSubmitting}
            required
          />
          <div className="flex justify-between items-center mt-1">
            {getFieldError('message') && (
              <p className="form-error">{getFieldError('message')}</p>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
              {formState.values.message.length}/1000
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
            className={cn(
              'btn btn-primary flex items-center space-x-2 px-6 py-3',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'min-w-[140px] justify-center'
            )}
          >
            {formState.isSubmitting ? (
              <>
                <Loader size={18} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send message</span>
              </>
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By submitting this form, you agree that your data will be used solely to respond to your inquiry.
          We do not share your information with third parties.
        </p>
      </form>
    </div>
  );
};