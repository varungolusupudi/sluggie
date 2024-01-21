import React from 'react';
import { useSpring, animated } from 'react-spring';

const ParallaxBubble = ({ text, offset }) => {
  const props = useSpring({
    opacity: 1,
    transform: `translateY(${offset}px)`,
  });

  return (
    <animated.div style={props} className="parallax-bubble">
      {text}
    </animated.div>
  );
};

export default ParallaxBubble;