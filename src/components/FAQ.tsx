import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    id: 1,
    question: "How does Ktinoscare work?",
    answer:
      "The Ktinoscare GPS tracker determines its location using GPS satellites and reports it via cellular networks (LTE). It has an integrated SIM card that automatically connects to local cell networks. Unlike Bluetooth devices, Ktinoscare can locate your pet worldwide, as long as there's sufficient cellular coverage.",
  },
  {
    id: 2,
    question: "Why do I need a subscription and what plans are available?",
    answer:
      "Ktinoscare trackers have a built-in SIM card, like your phone, that uses mobile networks to send you location info. All the fees needed to do that are covered by your subscription. That way, you get to enjoy unlimited range worldwide. You can cancel your subscription at any time.",
  },
  {
    id: 3,
    question: "What is the difference between Ktinoscare and AirTag?",
    answer:
      "AirTags need to be close to other Apple devices to track objects. If your pet is not within range of an Apple device, an AirTag won't be able to find them. Ktinoscare uses GPS and LTE technology to provide accurate live location data in all countries where Ktinoscare works.",
  },
  {
    id: 4,
    question: "What is the battery life of a Ktinoscare GPS Tracker?",
    answer:
      "Battery life strongly depends on tracker model, coverage, and usage. Setting up Power Saving Zones will give it a significant boost. The CAT 6 Mini can be used for up to 7 days without a charge. The DOG 6 tracker can last up to 2 weeks. The DOG 6 XL will track your buddy for up to 6 weeks.",
  },
  {
    id: 5,
    question: "What is the range of a Ktinoscare GPS Tracker?",
    answer:
      "Unlimited. In fact, you could track your pet even if you're on the other side of the world. Ktinoscare works in 175+ countries where there is 2G and/or LTE cellular coverage from one of our 500+ partners.",
  },
  {
    id: 6,
    question: "How do I get started with Ktinoscare?",
    answer:
      "After ordering your tracker online, download the app for Android or iOS and pick a subscription plan. Once your tracker arrives, attach it to your pet's collar or harness. After activating the device in the app, you can start tracking your buddy to help keep them safe around the clock.",
  },
  {
    id: 7,
    question: "Does Ktinoscare diagnose health conditions?",
    answer:
      "No, Ktinoscare monitors your pet's behaviors and vital signs and alerts you to any changes or longer-term trends that might need your attention. Medical advice and diagnosis should always be sought from a veterinarian.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <p className="faq-subtitle">Looking for answers? You've come to the right place.</p>

      <div className="faq-container">
        {/* LEFT SIDE - Questions List */}
        <div className="faq-questions">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className={`faq-question-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="faq-question-text">{item.question}</span>
              <span className="faq-arrow">{activeIndex === index ? "›" : "›"}</span>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - Answer Display */}
        <div className="faq-answer">
          <h3 className="faq-answer-question">{faqData[activeIndex].question}</h3>
          <p className="faq-answer-text">{faqData[activeIndex].answer}</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;