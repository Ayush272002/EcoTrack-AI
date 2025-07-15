"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Leaf,
  DollarSign,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import NeuralNetwork from "@/components/NeuralNetwork";
import StatsSection from "@/components/StatsSection";
import FeatureCard from "@/components/FeatureCard";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8" style={{ color: "#00aeef" }} />
            <span className="text-xl font-bold text-gray-900">Carbon &Sons</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-[#00aeef] transition-colors"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-gray-700 hover:text-[#00aeef] transition-colors"
            >
              Benefits
            </a>
            <Button
              variant="outline"
              className="border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef] hover:text-white bg-transparent"
            >
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <NeuralNetwork />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center space-x-2 bg-[#00aeef]/10 border border-[#00aeef]/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4" style={{ color: "#00aeef" }} />
              <span className="text-sm" style={{ color: "#00aeef" }}>
                AI-Powered Financial & Environmental Intelligence
              </span>
            </div>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              background: `linear-gradient(to right, #1f2937, #00aeef, #0891b2)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Smart Money,
            <br />
            Greener Future
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Our AI agent monitors your transactions in real-time, providing
            personalized advice to reduce your carbon footprint while optimizing
            your financial health.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="px-8 py-4 text-lg text-white cursor-pointer"
              style={{ backgroundColor: "#00aeef" }}
              onClick={() => router.push("/chat")}
            >
              Start Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" style={{ color: "#00aeef" }} />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" style={{ color: "#00aeef" }} />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" style={{ color: "#00aeef" }} />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Intelligent Features for a
              <span style={{ color: "#00aeef" }}> Sustainable Future</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI combines financial intelligence with environmental
              consciousness to help you make better decisions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI Transaction Analysis"
              description="Advanced machine learning algorithms analyze your spending patterns and identify opportunities for both savings and environmental impact reduction."
              gradient="from-[#00aeef] to-purple-600"
            />
            <FeatureCard
              icon={<Leaf className="h-8 w-8" />}
              title="Carbon Footprint Tracking"
              description="Real-time monitoring of your purchases' environmental impact with actionable insights to reduce your carbon footprint."
              gradient="from-[#00aeef] to-cyan-600"
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title="Smart Financial Advice"
              description="Personalized recommendations to optimize your budget, increase savings, and make environmentally conscious financial decisions."
              gradient="from-yellow-500 to-orange-600"
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Predictive Analytics"
              description="Forecast future spending trends and environmental impact to help you plan better financial and ecological strategies."
              gradient="from-pink-500 to-red-600"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure & Private"
              description="Bank-level security with end-to-end encryption ensures your financial data remains completely private and protected."
              gradient="from-indigo-500 to-[#00aeef]"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Real-time Insights"
              description="Instant notifications and recommendations delivered the moment you make a purchase, helping you stay on track."
              gradient="from-purple-500 to-pink-600"
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                Transform Your
                <span style={{ color: "#00aeef" }}> Financial Future</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Reduce Carbon Footprint by 40%",
                    desc: "Make environmentally conscious purchases with AI guidance",
                  },
                  {
                    title: "Save $2,400+ Annually",
                    desc: "Optimize spending with intelligent financial recommendations",
                  },
                  {
                    title: "Real-time Decision Support",
                    desc: "Get instant advice before making any purchase",
                  },
                  {
                    title: "Sustainable Investment Tips",
                    desc: "Discover eco-friendly investment opportunities",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <CheckCircle
                      className="h-6 w-6 mt-1 flex-shrink-0"
                      style={{ color: "#00aeef" }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#00aeef]/10 to-cyan-500/10 rounded-2xl p-8 backdrop-blur-sm border border-[#00aeef]/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border border-gray-200">
                    <span className="text-gray-700">
                      Monthly Carbon Savings
                    </span>
                    <span className="font-bold" style={{ color: "#00aeef" }}>
                      -2.4 tons CO₂
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border border-gray-200">
                    <span className="text-gray-700">Financial Savings</span>
                    <span className="font-bold" style={{ color: "#00aeef" }}>
                      +$200
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border border-gray-200">
                    <span className="text-gray-700">Eco-Score Improvement</span>
                    <span className="font-bold" style={{ color: "#00aeef" }}>
                      +85%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Make a
            <span style={{ color: "#00aeef" }}> Difference?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already saving money and protecting
            the planet with our AI-powered insights.
          </p>
          <Button
            size="lg"
            className="px-12 py-6 text-xl text-white cursor-pointer"
            style={{ backgroundColor: "#00aeef" }}
            onClick={() => router.push("/chat")}
          >
            Start Your Free Trial Today
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6" style={{ color: "#00aeef" }} />
            <span className="text-lg font-bold text-gray-900">Carbon &Sons</span>
          </div>
          <p className="text-gray-600">
            © 2024 Carbon &Sons. All rights reserved. Building a sustainable
            financial future.
          </p>
        </div>
      </footer>
    </div>
  );
}
