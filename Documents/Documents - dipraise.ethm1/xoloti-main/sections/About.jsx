"use client";
import { motion } from "framer-motion";
import { useState } from 'react';
import { Coins, Key, Users, Zap } from 'lucide-react';

const About = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  });

  const glowAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { 
      opacity: [0.5, 1, 0.5], 
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    { 
      icon: Coins, 
      title: "Earn Rewards", 
      description: "Spin to earn real rewards on every play"
    },
    { 
      icon: Key, 
      title: "Collect Keys", 
      description: "Find rare keys to unlock bigger prizes"
    },
    { 
      icon: Users, 
      title: "Play with Friends", 
      description: "Invite friends to boost your earnings"
    },
    { 
      icon: Zap, 
      title: "Powered by Solana", 
      description: "Fast, secure, and seamless gameplay"
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-purple-900 via-blue-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="relative max-w-6xl mx-auto px-4 sm:px-6"
      >
        <motion.div 
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              About Xoloti
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            A thrilling spin-to-earn game on the Solana blockchain where every spin could lead to epic rewards!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeIn(index % 2 === 0 ? "left" : "right", "spring", index * 0.2, 0.75)}
              className="relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-purple-500 hover:border-pink-500 transition-all duration-300">
                {hoveredFeature === index && (
                  <motion.div
                    variants={glowAnimation}
                    initial="hidden"
                    animate="show"
                    className="absolute inset-0 bg-purple-500 opacity-20 rounded-xl"
                  />
                )}
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeIn("up", "tween", 0.8, 1)}
          className="text-center mt-12"
        >
          <a 
            href="#play-now" 
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Start Playing Now!
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;