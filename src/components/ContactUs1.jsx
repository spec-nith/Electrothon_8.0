"use client";

import React, { useState, useRef, useEffect } from 'react';
import GlobeDemo from './GlobeDemo';
import { Check, Loader2 } from 'lucide-react';

// A simplified, dependency-light adaptation of the provided ContactUs1
// It uses plain inputs and CSS transitions instead of framer-motion and
// substitutes decorative components with CSS backgrounds to match the look.
export default function ContactUs1() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!formRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(formRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // simulate submit
      await new Promise((r) => setTimeout(r, 900));
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-12">
      {/* decorative blurred circles */}
      <div
        className="absolute -top-16 -left-16 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle at center,#e60a64, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full opacity-10 blur-2xl"
        style={{ background: 'radial-gradient(circle at center,#e60a64, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-5xl rounded-2xl border border-white/6 bg-secondary/10 p-6 md:p-8">
  <div className="grid md:grid-cols-2 gap-6 items-center">
          <div ref={formRef} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative flex items-baseline gap-3">
              <h2 className="text-white font-extrabold text-4xl md:text-5xl leading-tight" style={{ fontFamily: "'Press Start 2P', cursive" }}>Contact</h2>
              <span className="text-white font-extrabold text-4xl md:text-5xl leading-tight" style={{ fontFamily: "'Press Start 2P', cursive" }}>Us</span>
              {/* static decorative accent (no animation) */}
              <div className="absolute inset-0 h-24 w-full pointer-events-none" aria-hidden>
                <div style={{ background: 'radial-gradient(circle at 60% 30%, rgba(255,159,184,0.15), transparent 40%)' }} className="h-full w-full" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md bg-transparent border border-dashed border-gray-500 px-3 py-2 text-white focus:outline-none" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-md bg-transparent border border-dashed border-gray-500 px-3 py-2 text-white focus:outline-none" placeholder="Enter your email" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full rounded-md bg-transparent border border-dashed border-gray-500 px-3 py-2 text-white focus:outline-none resize-none" placeholder="Enter your message" />
              </div>

              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white font-semibold"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center px-4 py-2 border border-dashed border-gray-500 rounded-md">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...
                    </span>
                  ) : isSubmitted ? (
                    <span className="inline-flex items-center px-4 py-2 border border-dashed border-gray-500 rounded-md">
                      <Check className="mr-2 h-4 w-4" />Message Sent!
                    </span>
                  ) : (
                    <span className="px-4 py-2 border border-dashed border-gray-500 rounded-md">Send Message</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className={`flex items-center justify-center ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'} transition-all duration-700`}> 
            {/* Render the globe in a circular, transparent container so there's no colored rectangular frame */}
            <div className="relative mx-auto h-[320px] w-[320px] max-w-[420px] overflow-hidden rounded-full bg-transparent p-0 md:h-[420px] md:w-[420px]">
              <div className="w-full h-full">
                <GlobeDemo embedded={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
