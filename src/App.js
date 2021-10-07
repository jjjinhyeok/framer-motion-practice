import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { motion, useMotionValue, useTransform, useViewportScroll, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Box = styled.div`
  background: linear-gradient(to right, gray, lightgray);
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  overflow: auto;

  .obj {
    background: skyblue;
    width: 100px;
    height: 100px;
    border-radius: 30px;
  }

  .outer {
    width: 100vh;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .viewport {
    position: fixed;
    left: 0;
    top: 0;
  }

  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

function App() {
  // Variants
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const vari = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" }
  };

  // Motion values
  const x = useMotionValue(0);
  const background = useTransform(
    x, // motion vlaue
    [-100, 0, 100], // input range
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
  );

  // Viewport scroll
  const { scrollYProgress } = useViewportScroll();

  // Exit animation
  const [curImg, setCurImg] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1633511089632-81c880f39d25?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1633077666323-68f2e8bae631?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  ];
  const nextImg = () => {
    if(curImg === 2) {
      setCurImg(0);
    } else {
      setCurImg(curImg+1);
    }
  }

  return (
    <Box>
      <h4>Animation, Keyframes</h4>
      <motion.div className="obj" 
        animate={{ 
          scale: [1,0,2,0,3,1],
          rotate: [0, 0, 270, 270, 0]
        }}
        transition={{ duration: 2 }}
      ></motion.div>

      <h4>Variants</h4>
      <motion.div className="obj"
        variants={vari}
        animate={isOpen ? "open" : "closed"}
      >
      </motion.div>
      <button onClick={toggle}>{!isOpen ? "OPEN" : "CLOSE"}</button>

      <h4>Gesture</h4>
      <motion.div className="obj"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      />

      <h4>Drag</h4>
      <motion.div className="obj"
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          bottom: 50,
          right: 50,
        }}
      />

      <h4>Motion values</h4>
      <motion.div className="outer" style={{ background }}>
        <motion.div className="obj"
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{ x }}
        />
      </motion.div>

      <div className="viewport">
        <h4>Viewport scroll</h4>
        <motion.div className="obj"
          style={{
            opacity: scrollYProgress
          }}
        ></motion.div>
      </div>

      <h4>Exit animation</h4>
      <div className="slide">
        <button onClick={nextImg}>NEXT</button>
        <AnimatePresence>
          <motion.img
            key={images[curImg]}
            src={images[curImg]}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0  }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
      </div>
    </Box>
  );
}

export default App;
