import { motion } from 'framer-motion';

interface FloatingEmojisProps {
  // Define the shape of the emojis data being passed to the component
  emojis: {
    emoji: string;
    position: { x: number; y: number };
    size: number;
    rotation: number;
  }[];
}

const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ emojis }) => {
  return (
    // A container div that covers the entire screen
    <div className='absolute inset-0 z-0'>
      {emojis.map((item, index) => (
        // For each emoji, render a motion span
        <motion.span
          key={index}
          className='absolute'
          style={{
            left: `${(item.position.x / 10) * 100}%`,
            top: `${(item.position.y / 10) * 100}%`,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
            fontSize: `${item.size}rem`,
          }}
          animate={{
            // Animate the scale of the emoji with a small "pulsing" effect
            scale: [1, 1.1, 1],
            transition: {
              // Repeat the animation infinitely with looping
              repeat: Infinity,
              repeatType: 'loop',
              duration: 2,
              ease: 'easeInOut',
              delay: Math.random() * 2, // Random delay for each emoji's animation to start
            },
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingEmojis;
