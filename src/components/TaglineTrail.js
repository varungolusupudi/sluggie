import React, { useState } from 'react';
import { useTrail, animated } from '@react-spring/web';
import '../style.css'; // Ensure the path is correct

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <animated.div key={index} className="trailsText" style={style}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  );
};

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="contain" onClick={() => setOpen(!open)}>
      <Trail open={open}>
        <span className="slugHead">SLUGTRITION*</span>
        <div className="customize-your-meal">
          <span>CUSTOMIZE</span>{' '}
          <span>YOUR</span>{' '}
          <span>MEAL</span>
        </div>
        {/* "TODAY!" span has been removed */}
      </Trail>
    </div>
  );
};



export default App;
