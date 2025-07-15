"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="bg-white border-gray-200 hover:border-[#00aeef]/50 hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-6`}
          >
            <div className="text-white">{icon}</div>
          </motion.div>

          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#00aeef] transition-colors">
            {title}
          </h3>

          <p className="text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
