import { useState } from "react";
import { ChevronDown, Mail, Phone, MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What services does Vedseem Technologies offer?",
      answer:
        "We specialize in full-stack web development, mobile app development, e-commerce solutions, custom software development, and digital transformation consulting. Our team works with modern technologies like React, Next.js, Node.js, and MongoDB to deliver scalable solutions.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity and scope. A simple website can take 2-4 weeks, while a full-scale web application may take 2-4 months. We provide detailed timelines during the initial consultation and keep you updated throughout the development process.",
    },
    {
      question: "What is your pricing model?",
      answer:
        "We offer flexible pricing based on project requirements. We can work on a fixed-price basis for well-defined projects or hourly rates for ongoing development. Contact us for a detailed quote tailored to your specific needs.",
    },
    {
      question: "Do you provide post-launch support and maintenance?",
      answer:
        "Yes, we offer comprehensive post-launch support including bug fixes, updates, performance monitoring, and feature enhancements. We provide both one-time support packages and ongoing maintenance contracts.",
    },
    {
      question: "Can you work with existing codebases?",
      answer:
        "Absolutely. We have experience taking over and improving existing projects. We'll conduct a thorough code review, identify areas for improvement, and work with your existing tech stack or recommend upgrades where beneficial.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "Our core expertise includes React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, and modern JavaScript/TypeScript. We also work with various APIs, payment gateways, and cloud platforms like Vercel and AWS.",
    },
    {
      question: "How do you handle project communication?",
      answer:
        "We maintain transparent communication through regular updates via email, WhatsApp, or your preferred platform. For larger projects, we schedule weekly progress calls and provide access to project management tools for real-time tracking.",
    },
    {
      question: "Do you sign NDAs and protect intellectual property?",
      answer:
        "Yes, we take confidentiality seriously. We're happy to sign NDAs before project discussions and ensure all intellectual property rights are transferred to you upon project completion as per our agreement.",
    },
    {
      question: "Can you help with hosting and deployment?",
      answer:
        "Yes, we assist with deployment to platforms like Vercel, Netlify, AWS, or your preferred hosting provider. We also help with domain setup, SSL certificates, and ongoing server management if needed.",
    },
    {
      question: "What if I need changes after the project is completed?",
      answer:
        "We offer a warranty period for bug fixes post-launch. For new features or significant changes, we can discuss additional development work or set up a retainer agreement for ongoing support.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              FAQs
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions or reach out to our team for
            personalized assistance.
          </p>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-500/5 transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-blue-400 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 pt-2 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact-section" className="max-w-4xl mx-auto scroll-mt-24">
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-8">
              Our team is here to help. Reach out through any of these channels:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="mailto:vedseem.contact@gmail.com"
                className="flex flex-col items-center gap-3 p-6 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors group"
              >
                <Mail
                  className="text-blue-400 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div className="text-sm text-gray-400">
                    vedseem.contact@gmail.com
                  </div>
                </div>
              </a>
              <a
                href="https://wa.me/917618020879"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors group"
              >
                <MessageCircle
                  className="text-blue-400 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm text-gray-400">+91 7618020879</div>
                </div>
              </a>
              <a
                href="tel:+917618020879"
                className="flex flex-col items-center gap-3 p-6 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors group"
              >
                <Phone
                  className="text-blue-400 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-sm text-gray-400">+91 7618020879</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
