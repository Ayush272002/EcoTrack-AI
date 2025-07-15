"use client";

import { motion } from "framer-motion";
import {
  Brain,
  User,
  TrendingUp,
  Leaf,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "analysis" | "suggestion";
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const getIcon = () => {
    if (isUser) return <User className="h-4 w-4 text-white" />;

    switch (message.type) {
      case "analysis":
        return <TrendingUp className="h-4 w-4 text-white" />;
      case "suggestion":
        return <Leaf className="h-4 w-4 text-white" />;
      default:
        return <Brain className="h-4 w-4 text-white" />;
    }
  };

  const getIconColor = () => {
    if (isUser) return "#6b7280";
    switch (message.type) {
      case "analysis":
        return "#f59e0b";
      case "suggestion":
        return "#10b981";
      default:
        return "#00aeef";
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatContent = (content: string) => {
    if (content.includes("\n")) {
      return content.split("\n").map((line, index) => {
        if (line.includes("**")) {
          const parts = line.split("**");
          return (
            <motion.div
              key={index}
              className="mb-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {parts.map((part, partIndex) =>
                partIndex % 2 === 1 ? (
                  <span key={partIndex} className="font-semibold text-gray-900">
                    {part}
                  </span>
                ) : (
                  <span key={partIndex} className="text-gray-700">
                    {part}
                  </span>
                )
              )}
            </motion.div>
          );
        }

        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
          return (
            <motion.div
              key={index}
              className="ml-4 text-gray-700 mb-1 flex items-start space-x-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: "#00aeef" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.1,
                }}
              />
              <span>{line.trim().substring(1)}</span>
            </motion.div>
          );
        }

        if (/^\d+\./.test(line.trim())) {
          return (
            <motion.div
              key={index}
              className="ml-4 text-gray-700 mb-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {line.trim()}
            </motion.div>
          );
        }

        if (
          line.includes("💰") ||
          line.includes("🌱") ||
          line.includes("🌿") ||
          line.includes("🚗") ||
          line.includes("🏠") ||
          line.includes("💡") ||
          line.includes("📊") ||
          line.includes("🎯") ||
          /^[A-Z\s]+:/.test(line.trim())
        ) {
          return (
            <motion.div
              key={index}
              className="font-medium text-gray-800 mt-3 mb-1 flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            >
              <span>{line}</span>
            </motion.div>
          );
        }

        if (line.trim() === "") {
          return <div key={index} className="h-2" />;
        }

        return (
          <motion.div
            key={index}
            className="text-gray-700 mb-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            {line}
          </motion.div>
        );
      });
    }

    return (
      <motion.div
        className="text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  };

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 group`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        className={`flex ${
          isUser ? "flex-row-reverse" : "flex-row"
        } items-start space-x-3 max-w-[85%]`}
      >
        <motion.div
          className="p-2.5 rounded-full flex-shrink-0 relative"
          style={{ backgroundColor: getIconColor() }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {getIcon()}
          {!isUser && (
            <motion.div
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: "#10b981" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </motion.div>

        <motion.div
          layout
          className="relative"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Card
            className={`p-5 ${
              isUser
                ? "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
                : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
            } shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
          >
            <div className="text-sm leading-relaxed">
              {isUser ? (
                <motion.p
                  className="text-gray-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.content}
                </motion.p>
              ) : (
                <div className="space-y-1">
                  {formatContent(message.content)}
                </div>
              )}
            </div>

            <motion.div
              className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs text-gray-400">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <AnimatePresence>
                {isHovered && !isUser && (
                  <motion.div
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-6 w-6 p-0 hover:bg-gray-200"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-200"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-200"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Card>

          {copied && (
            <motion.div
              className="absolute -top-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Copied!
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
