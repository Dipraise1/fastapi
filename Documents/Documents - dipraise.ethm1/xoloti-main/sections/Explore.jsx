"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Sparkles, 
  X, 
  Wave, 
  BookOpen, 
  Target, 
  Collection,
  ScrollText 
} from 'lucide-react';

const Modal = ({ isOpen, onClose, world }) => {
  if (!isOpen || !world) return null;
  
  const getModalContent = (id) => {
    switch(id) {
      case 'world-1':
        return {
          title: "About",
          content: (
            <>
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">Introduction</h3>
              <p className="text-gray-300 mb-4">
                Xoloti is an imaginary story where ancient magic meets cutting-edge technology. Xochi, 
                a mystical underwater kingdom hidden beneath the ocean's depths, awaits rediscovery.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">Ecosystem</h3>
              <p className="text-gray-300 mb-4">
                The Xoloti Adventure ecosystem is a vast and immersive blockchain-based platform 
                combining gaming, entertainment, content, and rewards.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">$XOLOTI Coin</h3>
              <p className="text-gray-300 mb-4">
                A utility token used for gaming and content creation, rewarding participation 
                and contributions within our community.
              </p>
            </>
          )
        };
      case 'world-2':
        return {
          title: "Lore",
          content: (
            <p className="text-gray-300">
              Hundred years ago, beneath the ocean depths lay the kingdom of Xochi, ruled by 
              king Xoloti, god of fire and lightning. The Xolotis used their powers to protect 
              the kingdom, beloved by the Aztec people. When chaos emerged and foreign researchers 
              invaded, the Xolotis shape-shifted into mysterious creatures and vanished. Now, 
              the people of Aztec must embark on an adventure to find every surviving Xoloti 
              and return them to the ocean.
            </p>
          )
        };
      case 'world-3':
        return {
          title: "SPIN WHEEL",
          content: (
            <p className="text-gray-300">
              Immerse yourself in the captivating lore of Xoloti and embark on a heart-pounding 
              adventure to uncover the elusive missing Xoloti. This electrifying quest revolves 
              around the Xoloti Spin Wheel, a game of chance and skill that challenges brave 
              participants to collect coveted keys.
            </p>
          )
        };
      case 'world-4':
        return {
          title: "QUESTS",
          content: (
            <p className="text-gray-300">
              Embark on epic quests throughout the underwater realm of Xochi. Complete daily 
              challenges, unlock achievements, and earn rewards as you help restore balance 
              to the kingdom and reunite the scattered Xolotis.
            </p>
          )
        };
      case 'world-5':
        return {
          title: "COLLECTIBLES",
          content: (
            <p className="text-gray-300">
              Discover and collect unique digital assets inspired by the rich mythology of 
              the Xoloti universe. Each collectible tells a story and holds special powers 
              that can aid you in your quest to restore the underwater kingdom.
            </p>
          )
        };
      default:
        return {
          title: world.title,
          content: <p className="text-gray-300">Content coming soon...</p>
        };
    }
  };

  const modalContent = getModalContent(world.id);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <div className="aspect-video relative rounded-xl overflow-hidden mb-6">
            <img 
              src={world.imgUrl} 
              alt={world.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="text-blue-500" />
            {modalContent.title}
          </h2>
          
          <div className="prose prose-invert">
            {modalContent.content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExploreCard = ({ id, imgUrl, title, icon: Icon, index, active, handleClick }) => {
  if (!Icon) return null;

  return (
    <motion.div
      variants={{
        hidden: { x: index % 2 === 0 ? 50 : -50, opacity: 0 },
        show: { x: 0, opacity: 1, transition: { duration: 0.5, delay: index * 0.3 } },
      }}
      className={`relative ${
        active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer overflow-hidden`}
      onClick={() => handleClick(id)}
    >
      <img
        src={imgUrl}
        alt={title}
        className="absolute w-full h-full object-cover rounded-[24px]"
      />
      
      {active !== id ? (
        <div className="absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
          <div className="flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]">
            <Icon className="w-1/2 h-1/2 text-white" />
          </div>
          <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
            {title}
          </h2>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]"
        >
          <div className="flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]">
            <Icon className="w-1/2 h-1/2 text-white animate-pulse" />
          </div>
          <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
            {title}
          </h2>
        </motion.div>
      )}
    </motion.div>
  );
};

const Explore = () => {
  const [active, setActive] = useState("world-2");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState(null);

  const exploreWorlds = [
    {
      id: 'world-1',
      imgUrl: '/About.jpeg',
      title: 'About',
      icon: ScrollText,
    },
    {
      id: 'world-2',
      imgUrl: '/lore.jpeg',
      title: 'Lore',
      icon: BookOpen,
    },
    {
      id: 'world-3',
      imgUrl: '/spin.jpeg',
      title: 'SPIN WHEEL',
      icon: Target,
    },
    {
      id: 'world-4',
      imgUrl: '/quest.jpeg',
      title: 'QUESTS',
      icon: Sparkles,
    },
    {
      id: 'world-5',
      imgUrl: '/collectible.50.43.jpeg',
      title: 'COLLECTIBLES',
      icon: Collection,
    },
  ];

  const handleWorldClick = (id) => {
    setActive(id);
    const world = exploreWorlds.find(w => w.id === id);
    setSelectedWorld(world);
    setModalOpen(true);
  };

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/ocean-grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <motion.div
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.5,
              delayChildren: 0.3,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            show: { opacity: 1, y: 0 },
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-600">
              Explore the Depths of Xochi
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Dive into the mystical underwater kingdom and uncover the secrets of the Xolotis
          </p>
        </motion.div>

        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={handleWorldClick}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        <Modal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          world={selectedWorld}
        />
      </AnimatePresence>
    </section>
  );
};

export default Explore;