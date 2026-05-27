import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How does Ktinoskare work?",
    answer: "Ktinoskare uses smart sensors and AI-powered analytics to monitor your pet's health in real-time. It tracks vital signs, activity levels, and behavioral patterns to detect early signs of illness."
  },
  {
    question: "What subscription plans are available?",
    answer: "We offer three plans — Basic, Pro, and Enterprise. Basic covers single pet monitoring, Pro supports multiple pets with advanced analytics, and Enterprise is designed for veterinary clinics and farms."
  },
  {
    question: "How does GPS tracking work?",
    answer: "Our GPS tracker attaches to your pet's collar and provides real-time location updates. You can set safe zones and receive instant alerts if your pet leaves the designated area."
  },
  {
    question: "What is the battery life of the tracker?",
    answer: "The Ktinoskare tracker lasts up to 7 days on a single charge depending on usage. You will receive a notification when battery is running low."
  },
  {
    question: "Can Ktinoskare detect health conditions?",
    answer: "Ktinoskare does not diagnose health conditions. It monitors patterns and alerts you to unusual changes so you can consult your veterinarian early before issues worsen."
  },
  {
    question: "How do I get started?",
    answer: "Simply sign up on our platform, create your pet's profile, attach the tracker to your pet's collar, and you are ready to go! Our setup takes less than 5 minutes."
  },
  {
    question: "Is my pet's data secure?",
    answer: "Yes! We use industry-standard encryption to protect all your pet's health data. Your data is never shared with third parties without your consent."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Top Label */}
        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
          Frequently Asked Questions
        </p>

        <div className="flex flex-col md:flex-row gap-12">

          {/* Left Side — Heading */}
          <div className="md:w-1/3">
             <h2 className="text-2xl md:text-3xl font-medium text-gray-800 leading-snug italic">
             Looking for answers? You've come to the right place.
            </h2>
          </div>

          {/* Right Side — Questions */}
          <div className="md:w-2/3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">

                {/* Question Row */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center py-5 text-left text-gray-800 font-medium text-base hover:text-purple-700 transition"
                >
                  <span>{faq.question}</span>
                  <span className="text-2xl font-light ml-4">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>

                {/* Answer — slides open */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;