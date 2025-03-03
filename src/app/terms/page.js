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
    {
      id: "user-content",
      title: "V. User Content",
      content: "Details about user content.",
    },
    {
      id: "live-events",
      title: "VI. Live Events",
      content: "Details about live events.",
    },
    {
      id: "notifications",
      title: "VII. Content Notifications and Content Moderation",
      content: "Details about notifications.",
    },
    {
      id: "recommendations",
      title: "VIII. Content Recommendations",
      content: "Details about recommendations.",
    },
    {
      id: "arbitration",
      title: "IX. Arbitration Agreement",
      content: "Details about arbitration.",
    },
    {
      id: "class-action",
      title: "X. Class Action Waiver",
      content: "Details about class action.",
    },
    {
      id: "disclaimer",
      title: "XI. Disclaimer of Warranties",
      content: "Details about disclaimer.",
    },
    {
      id: "limitation",
      title: "XII. Limitation of Liability",
      content: "Details about liability.",
    },
    {
      id: "indemnification",
      title: "XIII. Indemnification",
      content: "Details about indemnification.",
    },
    {
      id: "sanctions",
      title: "XIV. Sanctions and Export Laws",
      content: "Details about sanctions.",
    },
    {
      id: "contact",
      title: "XV. How to Contact Us",
      content: "Details about contacting us.",
    },
    {
      id: "miscellaneous",
      title: "XVI. Miscellaneous",
      content: "Miscellaneous information.",
    },
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
                    e.preventDefault(); // Prevent default anchor jump
                    setOpenItem(section.id); // Open the accordion

                    // Delay scrolling slightly to allow accordion to expand first
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
                <Accordion.Trigger
                  id={item.id}
                  className="flex justify-between w-full text-lg font-medium text-gray-700 p-4 border-b border-gray-200 hover:bg-gray-50"
                >
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
                  hidden={openItem !== item.id}
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
