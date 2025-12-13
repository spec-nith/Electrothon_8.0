'use client';

import React from 'react';
import Dropdown from './ui/Dropdown';
import TargetCursor from './TargetCursor';

// Import the font
import '@/styles/hero.module.css';

// Official FAQ questions from Electrothon 8.0 (spec-nith/Electrothon_8.0_dummy)
// added `category` field for grouping
const questions = [
  {
    question: 'Will the travel and food + accommodation charges be covered?',
    answer: 'There will be no travel reimbursements provided to the hackathon attendees. But we will take care of your food and accommodation.',
    category: 'logistics',
    answerStyle: 'h-28',
    questionStyle: 'h-40',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'Who can apply to Electrothon 8.0?',
    answer: 'You must be at least 18 years old and enrolled at any designated university or college. Any student from any branch and year can participate.',
    category: 'eligibility',
    answerStyle: 'h-28',
    questionStyle: 'h-40',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'What if I have never been to a hackathon before?',
    answer: 'We require simply that you be curious and enthusiastic to join us on this journey. We will have talks, mentors, and workshops to help you with your project and figure things out.',
    category: 'general',
    answerStyle: 'h-32',
    questionStyle: 'h-48',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'Do I need prior development experience?',
    answer: 'No, you do not require any prior experience in development. We will provide you with mentors to help you figure stuff out. A will to think, learn, and collaborate is what matters.',
    category: 'general',
    answerStyle: 'h-32',
    questionStyle: 'h-48',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'What are the selection and evaluation criteria?',
    answer: 'Evaluation criteria include the novelty of the idea, complexity, clarity, feasibility, practicability, sustainability, scale of impact, user experience, and potential for future prospects.',
    category: 'evaluation',
    answerStyle: 'h-32',
    questionStyle: 'h-48',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'Are there any sponsored challenges and API prizes?',
    answer: 'Yes! There will be API prizes from multiple sponsors to build a hack on top of their APIs or SDKs. Keep an eye out on the website and social media handles for more details.',
    category: 'prizes',
    answerStyle: 'h-32',
    questionStyle: 'h-48',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'Can a college have multiple teams?',
    answer: 'There is no limitation in this case. We also welcome teams full of members from various backgrounds or institutions. Diversity is encouraged!',
    category: 'eligibility',
    answerStyle: 'h-28',
    questionStyle: 'h-40',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'What do I get from the event if I win?',
    answer: 'Winners will be awarded with monetary prizes. Short-listed teams will be given recognition. Winners of the finest hacks created using partner APIs and SDKs will receive special prizes.',
    category: 'prizes',
    answerStyle: 'h-32',
    questionStyle: 'h-48',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'What is the goal of Electrothon 8.0?',
    answer: 'Our goal is to foster an atmosphere where innovative concepts and technology approaches are welcomed. A gathering spot for engineers, technologists, and designers to collaborate on challenges.',
    category: 'general',
    answerStyle: 'h-32',
    questionStyle: 'h-48',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'How does Electrothon promote diversity?',
    answer: 'We believe that diversity is for all of us. Electrothon supports competitors from different regions, religions, the specially-abled, beginners, people of color, and everybody who dreams of greatness.',
    category: 'general',
    answerStyle: 'h-32',
    questionStyle: 'h-48',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'Do we need to apply in teams?',
    answer: 'For the experience to be fun and collaborative, we require that you register in teams of a minimum of 2 and a maximum of 4 participants.',
    category: 'eligibility',
    answerStyle: 'h-28',
    questionStyle: 'h-40',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'What if I have more queries?',
    answer: 'You can contact us on our social media handles, or email us at spec@nith.ac.in for more efficiency and detailed information.',
    category: 'support',
    answerStyle: 'h-28',
    questionStyle: 'h-40',
    fontSizeScaling: 'text-sm md:text-base',
  },
  {
    question: 'What is the cost of participation?',
    answer: 'Zero. Zip. Zilch. Nada. Nothing. Our wonderful sponsors have made registration absolutely free, turning it into a truly enchanting experience for all.',
    category: 'logistics',
    answerStyle: 'h-28',
    questionStyle: 'h-40',
    fontSizeScaling: 'text-sm md:text-base',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'support', label: 'Support' },
];

const FAQList = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredFaqs =
    activeCategory === 'all'
      ? questions
      : questions.filter((q) => q.category === activeCategory);

  return (
    <section 
      className="relative w-full py-24 min-h-screen flex items-center justify-center"
      id="faqs"
    >
      <TargetCursor targetSelector=".cursor-target" />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg_img.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1a1a1a'
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mt-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-white font-extrabold text-4xl md:text-5xl leading-tight" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              Frequently asked questions
            </h2>

            {/* Category Tabs centered */}
            <div className="mt-8 mb-6 flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cursor-target rounded-full px-4 py-2 text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/6'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Questions grid */}
            <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredFaqs.map((question, index) => (
                <Dropdown
                  key={`question-${index}`}
                  question={question.question}
                  answer={question.answer}
                  finalHeightAnswer={question.answerStyle}
                  finalHeightQuestion={question.questionStyle}
                  fontSizeScaling={question.fontSizeScaling}
                />
              ))}
            </div>
          </div>
        </div>

        {/* end content */}
      </div>
    </section>
  );
};

export default FAQList;
