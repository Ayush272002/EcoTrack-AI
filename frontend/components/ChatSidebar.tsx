"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  X,
  Plus,
  MessageSquare,
  TrendingUp,
  Leaf,
  Settings,
  HelpCircle,
  Home,
} from "lucide-react";
import Link from "next/link";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentChats = [
  {
    id: "1",
    title: "Monthly Budget Analysis",
    time: "2 hours ago",
    type: "analysis",
  },
  {
    id: "2",
    title: "Carbon Footprint Tips",
    time: "1 day ago",
    type: "suggestion",
  },
  { id: "3", title: "Investment Advice", time: "3 days ago", type: "analysis" },
  {
    id: "4",
    title: "Eco-friendly Shopping",
    time: "1 week ago",
    type: "suggestion",
  },
];

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 lg:relative lg:translate-x-0"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center space-x-2">
                    <Brain className="h-6 w-6" style={{ color: "#00aeef" }} />
                    <span className="font-bold text-gray-900">EcoFinAI</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  className="w-full mt-4 text-white"
                  style={{ backgroundColor: "#00aeef" }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>

              {/* Navigation */}
              <div className="p-4 border-b border-gray-200">
                <nav className="space-y-2">
                  <Link href="/">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-gray-50"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Leaf className="h-4 w-4 mr-2" />
                    Eco Tracker
                  </Button>
                </nav>
              </div>

              {/* Recent Chats */}
              <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Recent Chats
                </h3>
                <div className="space-y-2">
                  {recentChats.map((chat) => (
                    <Card
                      key={chat.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-2">
                        <div
                          className="p-1 rounded"
                          style={{
                            backgroundColor:
                              chat.type === "analysis" ? "#00aeef" : "#10b981",
                          }}
                        >
                          {chat.type === "analysis" ? (
                            <TrendingUp className="h-3 w-3 text-white" />
                          ) : (
                            <Leaf className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {chat.title}
                          </p>
                          <p className="text-xs text-gray-500">{chat.time}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
