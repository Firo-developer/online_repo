import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FaqItem[];
}

const FaqSection = ({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our online learning platform and courses.",
  faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Enrolling in a course is easy! Simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. If you're not already logged in, you'll be prompted to create an account or sign in before completing your enrollment.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. For some courses, we also offer payment plans that allow you to split the cost into monthly installments.",
    },
    {
      question: "Can I get a refund if I'm not satisfied with a course?",
      answer:
        "Yes, we offer a 30-day money-back guarantee for most courses. If you're not completely satisfied with your purchase, you can request a refund within 30 days of enrollment, provided you haven't completed more than 30% of the course content.",
    },
    {
      question: "How long do I have access to a course after enrolling?",
      answer:
        "Once you enroll in a course, you have lifetime access to the course materials. You can revisit the content as many times as you like, even after you've completed the course. This allows you to refresh your knowledge whenever needed.",
    },
    {
      question: "Are there any prerequisites for taking courses?",
      answer:
        "Prerequisites vary by course. Some beginner-level courses have no prerequisites, while more advanced courses may require prior knowledge or completion of introductory courses. Each course page clearly lists any prerequisites in the course description.",
    },
    {
      question: "Do you offer certificates upon course completion?",
      answer:
        "Yes, we provide digital certificates of completion for all courses. Once you've successfully completed all required modules and assignments, you can download your personalized certificate directly from your dashboard and share it on your LinkedIn profile or resume.",
    },
  ],
}: FaqSectionProps) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-background/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-background rounded-lg shadow-md p-6"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b border-slate-200 last:border-0"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-primary font-medium hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
