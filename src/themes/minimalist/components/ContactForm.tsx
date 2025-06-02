
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  isDarkMode: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isDarkMode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Mock submission - replace with actual API call later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', data);
    setSubmitSuccess(true);
    setIsSubmitting(false);
    reset();
    
    // Clear success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const inputClasses = `w-full px-4 py-3 border text-base focus:outline-none focus:ring-2 focus:ring-gray-400 ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-600 text-gray-100' 
      : 'bg-white border-gray-300 text-gray-900'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    isDarkMode ? 'text-gray-200' : 'text-gray-700'
  }`;

  const errorClasses = `text-sm mt-1 ${
    isDarkMode ? 'text-gray-400' : 'text-gray-600'
  }`;

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name (required)
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className={errorClasses}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email (required)
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className={errorClasses}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject (required)
          </label>
          <input
            id="subject"
            type="text"
            className={inputClasses}
            {...register('subject', { 
              required: 'Subject is required',
              minLength: { value: 5, message: 'Subject must be at least 5 characters' }
            })}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className={errorClasses}>
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message (required)
          </label>
          <textarea
            id="message"
            rows={6}
            className={inputClasses}
            {...register('message', { 
              required: 'Message is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters' }
            })}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className={errorClasses}>
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 text-base font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 ${
              isDarkMode
                ? 'bg-gray-700 text-gray-100 border border-gray-600'
                : 'bg-gray-200 text-gray-900 border border-gray-300'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {submitSuccess && (
          <div className={`text-center text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Message sent successfully. Thank you for your inquiry.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
