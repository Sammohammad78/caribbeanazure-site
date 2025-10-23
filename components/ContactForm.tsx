"use client";

import { useState } from 'react';
import { submitContact } from '@/app/(marketing)/actions/contact';
import { site } from '@/content/site';

/**
 * Contact form allowing visitors to send a message. Uses a server action for submission.
 */
export default function ContactForm() {
  const { contact } = site.en;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        try {
          await submitContact(formData);
          setError(null);
        } catch (err) {
          setError('Something went wrong. Please try again later.');
        } finally {
          setLoading(false);
        }
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-azure focus:ring-azure"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-azure focus:ring-azure"
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-azure focus:ring-azure"
        />
      </div>
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Budget
        </label>
        <select
          name="budget"
          id="budget"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-azure focus:ring-azure"
          defaultValue=""
        >
          <option value="" disabled>
            Select your budget
          </option>
          {contact.budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden">
        {/* Honeypot field to catch bots */}
        <label htmlFor="phone">Phone</label>
        <input type="text" name="honeypot" id="honeypot" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-azure focus:ring-azure"
        ></textarea>
      </div>
      {error && (
        <p className="text-red-600 text-sm" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-azure text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-azure-dark disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}