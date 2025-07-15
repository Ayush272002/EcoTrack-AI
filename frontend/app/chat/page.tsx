"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Menu, Sparkles } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "analysis" | "suggestion";
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI financial and environmental advisor. I can help you analyze your spending patterns, reduce your carbon footprint, and optimize your finances. What would you like to know?",
    role: "assistant",
    timestamp: new Date(),
    type: "text",
  },
];

const sampleSuggestions = [
  "Analyze my recent transactions",
  "How can I reduce my carbon footprint?",
  "Show me my spending patterns",
  "Suggest eco-friendly alternatives",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({ container: messagesContainerRef });
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageCount((prev) => prev + 1);
    setIsTyping(true);

    try {
      console.log("Sending request to:", `${API_BASE_URL}/generate`);
      console.log("Request payload:", { prompt: content });

      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: content,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(
          `Failed to get response from server: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Simulate realistic typing delay based on response length
      const responseLength = data.ans?.length || 100;
      const typingDelay = Math.min(Math.max(responseLength * 20, 1000), 4000);

      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            data.ans ||
            "I apologize, but I couldn't process your request at the moment. Please try again.",
          role: "assistant",
          timestamp: new Date(),
          type: determineMessageType(content),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setMessageCount((prev) => prev + 1);
        setIsTyping(false);
      }, typingDelay);
    } catch (error) {
      console.error("Error calling API:", error);

      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "I'm sorry, I'm having trouble connecting to my services right now. Please check your connection and try again.",
          role: "assistant",
          timestamp: new Date(),
          type: "text",
        };

        setMessages((prev) => [...prev, errorMessage]);
        setMessageCount((prev) => prev + 1);
        setIsTyping(false);
      }, 1500);
    }
  };

  const determineMessageType = (
    userInput: string
  ): "text" | "analysis" | "suggestion" => {
    const input = userInput.toLowerCase();

    if (
      input.includes("transaction") ||
      input.includes("spending") ||
      input.includes("analyze") ||
      input.includes("budget")
    ) {
      return "analysis";
    }

    if (
      input.includes("carbon") ||
      input.includes("footprint") ||
      input.includes("environment") ||
      input.includes("eco") ||
      input.includes("green")
    ) {
      return "suggestion";
    }

    return "text";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30 flex relative overflow-hidden"
    >
      <ParticleBackground />

      {/* Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <motion.header
          style={{
            opacity: headerOpacity,
            backdropFilter: `blur(${headerBlur}px)`,
          }}
          className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-4 py-4 flex items-center justify-between sticky top-0 z-20"
        >
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="relative p-2 rounded-full"
                style={{ backgroundColor: "#00aeef" }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(0, 174, 239, 0.4)",
                    "0 0 0 10px rgba(0, 174, 239, 0)",
                    "0 0 0 0 rgba(0, 174, 239, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Brain className="h-5 w-5 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#10b981" }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              <div>
                <motion.h1
                  className="font-semibold text-gray-900"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  EcoFinAI Assistant
                </motion.h1>
                <motion.p
                  className="text-sm text-gray-500 flex items-center space-x-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Financial & Environmental AI</span>
                </motion.p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="flex items-center space-x-2 text-sm text-gray-500 bg-white/60 rounded-full px-3 py-1"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#00aeef" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <span>Online</span>
            </motion.div>

            <motion.div
              className="text-xs text-gray-400 bg-white/40 rounded-full px-2 py-1"
              whileHover={{ scale: 1.05 }}
            >
              {messageCount} messages
            </motion.div>
          </motion.div>
        </motion.header>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: index * 0.1,
                }}
              >
                <ChatMessage message={message} />
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                className="p-2 rounded-full relative"
                style={{ backgroundColor: "#00aeef" }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(0, 174, 239, 0.4)",
                    "0 0 0 8px rgba(0, 174, 239, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Brain className="h-4 w-4 text-white" />
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200/50 shadow-lg"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#00aeef" }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.span
                className="text-sm text-gray-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                AI is thinking...
              </motion.span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <AnimatePresence>
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.5 }}
              className="px-4 pb-2"
            >
              <motion.div
                className="flex flex-wrap gap-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {sampleSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.8 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-sm border-gray-200 hover:border-[#00aeef] hover:text-[#00aeef] bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
                    >
                      {suggestion}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </motion.div>
  );
}
