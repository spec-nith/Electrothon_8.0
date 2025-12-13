'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Reworked Dropdown to behave like a Blocks-style FAQ accordion:
// - smooth max-height transition
// - accessible aria attributes
// - chevron rotation and subtle styling
// Props kept the same so `FAQList.jsx` doesn't need changes.
const Dropdown = ({
  question,
  answer,
  finalHeightAnswer = 'h-40',
  finalHeightQuestion = 'h-56',
  fontSizeScaling = 'text-base',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState('0px');

  useEffect(() => {
    // update measured height when toggling or when content changes
    if (isOpen && contentRef.current) {
      setMaxH(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxH('0px');
    }
  }, [isOpen, answer]);

  // ensure max-height adjusts if window resizes while open
  useEffect(() => {
    const onResize = () => {
      if (isOpen && contentRef.current) {
        setMaxH(`${contentRef.current.scrollHeight}px`);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  const id = `faq-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className="w-full mb-4">
      <div className="w-full">
        <div className="flex-1">
          <button
            aria-expanded={isOpen}
            aria-controls={id}
            onClick={() => setIsOpen((s) => !s)}
            className={`cursor-target w-full text-left px-5 py-4 rounded-lg transition-shadow duration-200 border-2 ${isOpen ? 'border-blue-400 shadow-xl' : 'border-transparent shadow-none'} bg-transparent text-white`}
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            <div className={`flex items-center justify-between gap-4`}>
              <div className={`text-left ${fontSizeScaling} font-bold`}>{question}</div>
              <div className="flex items-center justify-center w-8 h-8">
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
            </div>
          </button>

          {/* Animated answer panel using max-height for smooth transition */}
          <div
            id={id}
            ref={contentRef}
            style={{ maxHeight: maxH }}
            className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          >
            <div className="mt-0 px-5 py-4 bg-transparent border-2 border-t-0 rounded-b-lg border-blue-500">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                {answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dropdown;
