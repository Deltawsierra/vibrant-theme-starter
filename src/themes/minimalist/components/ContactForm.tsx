
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';

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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
          }
        ]);

      if (error) {
        throw error;
      }

      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full px-0 py-4 text-lg font-magneti font-light border-0 border-b-2 bg-transparent focus:outline-none focus:ring-0 ${
    isDarkMode 
      ? 'border-gray-700 text-gray-100 focus:border-gray-500 placeholder-gray-600' 
      : 'border-gray-300 text-gray-900 focus:border-gray-600 placeholder-gray-500'
  }`;

  const labelClasses = `block text-lg font-magneti font-light mb-2 ${
    isDarkMode ? 'text-gray-400' : 'text-gray-600'
  }`;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            placeholder="Your name"
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
          />
          {errors.name && (
            <p className={`text-base font-magneti mt-2 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            placeholder="your.email@domain.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className={`text-base font-magneti mt-2 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className={inputClasses}
            placeholder="Project inquiry"
            {...register('subject', { 
              required: 'Subject is required',
              minLength: { value: 5, message: 'Subject must be at least 5 characters' }
            })}
          />
          {errors.subject && (
            <p className={`text-base font-magneti mt-2 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className={inputClasses}
            placeholder="Tell me about your project"
            {...register('message', { 
              required: 'Message is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters' }
            })}
          />
          {errors.message && (
            <p className={`text-base font-magneti mt-2 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-6 text-lg font-magneti font-light border-2 ${
              isDarkMode
                ? 'bg-gray-900 text-gray-100 border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            } ${isSubmitting ? 'opacity-50' : ''}`}
          >
            {isSubmitting ? 'Sending' : 'Send Message'}
          </button>
        </div>

        {submitSuccess && (
          <div className={`text-center text-lg font-magneti font-light ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Message sent successfully
          </div>
        )}

        {submitError && (
          <div className={`text-center text-lg font-magneti font-light ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            {submitError}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
