"use client";

import React, { useState } from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
// import the same font/style used by the main headings
import '@/styles/hero.module.css';

export default function ContactBlocks() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) return setError('Email is required');
    if (!validateEmail(email)) return setError('Enter a valid email');
    if (!message) return setError('Please enter a message');

    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setSuccess('Message sent — we will get back to you soon!');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left - Form */}
      <div className="bg-card/30 rounded-xl p-6 border border-white/6">
  <h3 className="text-white font-extrabold text-4xl md:text-5xl leading-tight mb-2" style={{ fontFamily: "'Press Start 2P', cursive" }}>Contact Us</h3>
        <p className="text-gray-300 mb-4">Have questions? Fill the form and our team will contact you shortly.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-3 rounded-md text-white bg-transparent border-2 border-dashed border-gray-400 focus:outline-none text-sm"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-md text-white bg-transparent border-2 border-dashed border-gray-400 focus:outline-none text-sm"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded-md text-white bg-transparent border-2 border-dashed border-gray-400 focus:outline-none text-sm resize-none"
            rows={5}
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          <div className="flex items-center justify-start">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 border-2 border-blue-500 rounded-md text-white transition-all duration-300 text-sm font-bold"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Right - Info */}
      <div className="flex flex-col justify-between h-full">
        <div>
          <h4 className="text-white font-extrabold text-lg mb-2" style={{ fontFamily: "'Press Start 2P', cursive" }}>Contact information</h4>
          <p className="text-gray-300 mb-4">Prefer email? Reach out at <a href="mailto:spec@nith.ac.in" className="underline">spec@nith.ac.in</a></p>

          <div className="mb-4">
            <p className="text-gray-300 font-medium">Address</p>
            <p className="text-gray-400 text-sm">NIT Hamirpur, Hamirpur, Himachal Pradesh, India</p>
          </div>

          <div className="flex gap-4 mt-4">
            <a href="https://github.com/spec-nith" target="_blank" rel="noreferrer" className="text-white hover:opacity-90"><Github /></a>
            <a href="https://www.linkedin.com/company/s-p-e-c-nith/posts/?feedView=all" target="_blank" rel="noreferrer" className="text-blue-400 hover:opacity-90"><Linkedin /></a>
            <a href="mailto:spec@nith.ac.in" className="text-white hover:opacity-90"><Mail /></a>
            <a href="https://instagram.com/s.p.e.c_nith" target="_blank" rel="noreferrer" className="text-pink-500 hover:opacity-90"><Instagram /></a>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => window.open('https://electrothon-7-0.vercel.app/', '_blank')}
            className="relative text-white font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 rounded-lg border-2 border-blue-500"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem' }}
          >
            Visit Electrothon
          </button>
        </div>
      </div>
    </div>
  );
}
