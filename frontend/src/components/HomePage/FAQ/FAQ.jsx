import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I list my property on the platform?",
      answer:
        "To list your property, navigate to the 'List Property' section, fill in the required details, and submit your listing for review.",
    },
    {
      question: "How can I contact the property owner?",
      answer:
        "You can contact the property owner by clicking on the 'Contact Owner' button on the property listing page. You will be provided with the owner's contact details.",
    },
    {
      question: "How do I schedule a property visit?",
      answer:
        "To schedule a property visit, click on the 'Schedule Visit' button on the property listing page and select a convenient date and time.",
    },
    {
      question: "What are the payment options available?",
      answer:
        "We offer various payment options including credit/debit cards, net banking, and UPI. You can choose your preferred payment method during the checkout process.",
    },
  ];

  return (
    <section
      className="py-24 bg-white-background dark:bg-black-background"
      id="faq"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h6 className="text-lg text-base-400 dark:text-base-100 font-medium text-center mb-2">
            FAQs
          </h6>
          <h2 className="text-4xl font-manrope text-center font-bold text-black-foreground dark:text-white-foreground leading-[3.25rem]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="accordion-group">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion py-8 px-6 border-b border-solid border-white-border dark:border-black-border transition-all duration-500 rounded-2xl hover:bg-base-100 dark:hover:bg-base-400 ${
                activeIndex === index ? "bg-indigo-50 dark:bg-gray-800" : ""
              }`}
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between leading-8 text-black-foreground dark:text-white-foreground w-full transition duration-500 text-left hover:text-base-300 dark:hover:text-base-200 font-medium"
                onClick={() => toggleAccordion(index)}
              >
                <h5>{faq.question}</h5>
                <FiChevronDown
                  className={`text-gray-500 dark:text-gray-400 transition duration-500 group-hover:text-base-400 dark:group-hover:text-base-100 ${
                    activeIndex === index
                      ? "rotate-180 text-black-foreground dark:text-white-foreground"
                      : ""
                  }`}
                  size={22}
                />
              </button>
              {activeIndex === index && (
                <div className="accordion-content w-full px-0 overflow-hidden mt-4">
                  <p className="text-base-200 text-black-foreground dark:text-white-foreground leading-6">
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
