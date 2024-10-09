"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from "@/styles";
import { staggerContainer, fadeIn, planetVariants } from "@/utils/motion";
import { TypingText, TitleText } from "@/components/CustomTexts";
import { startingFeatures } from "@/constants";

const FeatureCard = ({ feature, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
      <div className="relative px-6 py-4 bg-gray-900 rounded-lg leading-none flex items-center space-x-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white font-bold text-xl">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="text-white text-lg font-semibold mb-1">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowRight className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const GetStarted = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const enhancedFeatures = [
    {
      title: "Create Your Account",
      description: "Sign up and customize your profile in just a few clicks.",
    },
    {
      title: "Choose Your Realm",
      description: "Select from multiple magical worlds, each with unique rewards.",
    },
    {
      title: "Spin to Win",
      description: "Use your daily spins to earn exclusive rewards and collectibles.",
    },
    {
      title: "Level Up & Earn",
      description: "Complete quests, unlock achievements, and earn more spins.",
    },
  ];

  return (
    <section ref={ref} className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className={`${styles.innerWidth} mx-auto`}
      >
        <div className="relative mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Begin Your 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 ml-2">
                Adventure
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start your journey in the magical world of Xoloti. Spin, collect, and earn as you explore enchanted realms.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            className="absolute -top-16 right-0 md:right-40 w-24 h-24 text-yellow-400"
          >
            <Sparkles className="w-full h-full animate-pulse" />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            variants={planetVariants("left")}
            className="flex-1 relative"
          >
            <div className="relative z-10">
              <img
                src="/get-started.png"
                alt="get-started"
                className="w-full max-w-md mx-auto"
              />
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 w-full max-w-md mx-auto"
              >
                <img
                  src="/get-started.png"
                  alt="floating-effect"
                  className="w-full opacity-50 blur-lg"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="flex-1 space-y-6">
            {enhancedFeatures.map((feature, index) => (
              <FeatureCard 
                key={index} 
                feature={feature} 
                index={index}
                isInView={isInView}
              />
            ))}
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg w-full flex items-center justify-center space-x-2 hover:from-purple-500 hover:to-pink-500 transition-all duration-200"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GetStarted;