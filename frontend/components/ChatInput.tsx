"use client";

import { useState, type KeyboardEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Mic, Smile, X } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="border-t border-gray-200/50 bg-white/80 backdrop-blur-xl p-4 relative"
    >

      <motion.div
        className="flex items-end space-x-3"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex-1 relative">
          <motion.div
            className={`relative rounded-2xl border-2 transition-all duration-300 ${
              isFocused
                ? "border-[#00aeef] shadow-lg shadow-[#00aeef]/20"
                : "border-gray-200 hover:border-gray-300"
            } bg-white/90 backdrop-blur-sm`}
            animate={{
              boxShadow: isFocused
                ? "0 0 0 3px rgba(0, 174, 239, 0.1)"
                : "0 0 0 0px rgba(0, 174, 239, 0)",
            }}
          >
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask about your finances, carbon footprint, or get personalized advice..."
              disabled={disabled}
              rows={1}
              className="w-full resize-none rounded-2xl px-4 py-3 pr-20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-transparent placeholder-gray-400"
              style={{ minHeight: "48px", maxHeight: "120px" }}
            />

            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                >
                  <Paperclip className="h-4 w-4 text-gray-400" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                >
                  <Smile className="h-4 w-4 text-gray-400" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleRecording}
                  className={`h-8 w-8 p-0 rounded-full transition-colors ${
                    isRecording
                      ? "bg-red-100 hover:bg-red-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {isRecording ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </motion.div>
                  ) : (
                    <Mic className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Character count */}
          <AnimatePresence>
            {message.length > 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-6 right-0 text-xs text-gray-400"
              >
                {message.length}/500
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: message.trim() ? 0 : -45,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            size="sm"
            className="h-12 w-12 rounded-2xl p-0 text-white relative overflow-hidden"
            style={{ backgroundColor: "#00aeef" }}
          >
            <motion.div
              animate={{
                scale: disabled ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: disabled ? Number.POSITIVE_INFINITY : 0,
              }}
            >
              <Send className="h-5 w-5" />
            </motion.div>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: message.trim() ? [0, 2] : 0,
                opacity: message.trim() ? [1, 0] : 1,
              }}
              transition={{ duration: 0.6 }}
            />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-2 text-xs text-gray-400 text-center"
        animate={{ opacity: isFocused ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        Press Enter to send, Shift+Enter for new line
      </motion.div>
    </motion.div>
  );
}
