"use client";
import { motion } from 'framer-motion';

const Hero = () => {
  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3,
      },
    },
  };

  const textVariant = (delay) => ({
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay,
        bounce: 0.4,
      },
    },
  });

  const slideIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
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

  const bopAnimation = {
    scale: [1, 1.1, 1],
    rotate: [0, -3, 3, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <section className={`sm:pl-16 pl-6 py-12`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="mx-auto flex flex-col"
      >
        <div className="flex justify-center items-center flex-col relative z-10">
          <motion.h1 
            variants={textVariant(1.1)}
            className="text-[64px] sm:text-[100px] md:text-[144px] uppercase font-black text-white text-center"
          >
            Xoloti
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center flex-wrap"
          >
            <motion.h1 
              whileHover={bopAnimation} 
              className="text-[64px] sm:text-[100px] md:text-[144px] uppercase font-black text-white"
            >
              Adventure
            </motion.h1>
            <motion.div 
              animate={bopAnimation}
              className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-4 sm:mx-6 md:mx-8"
            >
              <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">X</span>
            </motion.div>
            <motion.h1 
              whileHover={bopAnimation} 
              className="text-[64px] sm:text-[100px] md:text-[144px] uppercase font-black text-white"
            >
              .
            </motion.h1>
          </motion.div>
        </div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="relative w-full md:-mt-[20px] -mt-[12px]"
        >
          <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />
          <img
            src="/bg .jpeg"
            alt="hero_cover"
            className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
          />

          <a href="#explore">
            <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10">
              <motion.img
                animate={bopAnimation}
                src="/xloti-removebg-preview.png"
                alt="stamp"
                className="w-[100px] h-[100px] sm:w-[155px] sm:h-[155px] object-contain"
              />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;