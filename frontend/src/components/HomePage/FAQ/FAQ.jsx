import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I update my billing information?",
      answer:
        "To update your billing information, navigate to your account settings and click on the 'Billing Information' section. Update the required fields and save changes.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "To contact customer support, click on the 'Help' or 'Contact Us' link on our platform. You can email, call, or use the live chat feature for assistance.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "Go to your account settings and click on 'Edit Profile.' Make your desired changes and click save to update your profile information.",
    },
    {
      question: "How do I find my purchase history?",
      answer:
        "Your purchase history is available under the 'Orders' section in your account dashboard. You can view and download invoices for each transaction.",
    },
  ];

  return (
    <section className="py-24" id="faq">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h6 className="text-lg text-indigo-600 font-medium text-center mb-2">
            FAQs
          </h6>
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="accordion-group">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-50 ${
                activeIndex === index ? "bg-indigo-50" : ""
              }`}
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-500 text-left hover:text-indigo-600 font-medium"
                onClick={() => toggleAccordion(index)}
              >
                <h5>{faq.question}</h5>
                <FiChevronDown
                  className={`text-gray-500 transition duration-500 group-hover:text-indigo-600 ${
                    activeIndex === index ? "rotate-180 text-indigo-600" : ""
                  }`}
                  size={22}
                />
              </button>
              {activeIndex === index && (
                <div className="accordion-content w-full px-0 overflow-hidden mt-4">
                  <p className="text-base text-gray-900 leading-6">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
