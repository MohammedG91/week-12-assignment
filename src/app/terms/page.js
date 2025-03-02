"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TermsPage() {
  const [openItem, setOpenItem] = useState(null);
  const sections = [
    {
      id: "account",
      title: "I. Account Terms",
      content: "Details about accounts.",
    },
    {
      id: "subscriptions",
      title: "II. Subscriptions, Payments, and Cancellation",
      content: "Details about subscriptions.",
    },
    {
      id: "prohibited",
      title: "III. Prohibited Uses",
      content: "Details about prohibited uses.",
    },
    {
      id: "materials",
      title: "IV. Our Materials and License to You",
      content: "Details about materials and license.",
    },
    // Add more sections here
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Quick Navigation</h2>
        <nav>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenItem(section.id);

                    // Delay scrolling slightly to allow accordion to expand
                    setTimeout(() => {
                      document.getElementById(section.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 200);
                  }}
                  className="text-blue-600 text-sm hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white shadow-md">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

        <Accordion.Root
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
        >
          {sections.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Header>
                <Accordion.Trigger className="w-full text-lg font-medium text-gray-700 p-4 border-b border-gray-200 hover:bg-gray-50">
                  {item.title}
                  <motion.span
                    animate={{ rotate: openItem === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openItem === item.id ? "auto" : 0,
                    opacity: openItem === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="p-4 text-sm text-gray-600"
                >
                  {item.content}
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </main>
    </div>
  );
}
