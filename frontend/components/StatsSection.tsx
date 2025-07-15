"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "50K+", label: "Active Users", suffix: "" },
  { number: "2.4M", label: "Tons CO₂ Saved", suffix: "" },
  { number: "$12M", label: "Money Saved", suffix: "+" },
  { number: "98", label: "Satisfaction Rate", suffix: "%" },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6 border-y border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  duration: 0.5,
                  type: "spring",
                }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: "#00aeef" }}
              >
                {stat.number}
                {stat.suffix}
              </motion.div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
