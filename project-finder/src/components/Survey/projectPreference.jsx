import React, { useState, useEffect, useCallback } from 'react';
import { Motion, spring } from 'react-motion/lib/react-motion';


const reinsert = (arr, from, to) => {
  const output = arr.slice(0);
  const val = output[from];
  output.splice(from, 1);
  output.splice(to, 0, val);
  return output;
};

const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

const springConfig = { stiffness: 300, damping: 50 };
const CATEGORY_NAMES = ['Web', 'Android App', 'iOS App', 'Voice'];

const ProjectPreference = () => {
  const [preferenceList, setList] = useState(CATEGORY_NAMES);
  const [isPressed, setPressed] = useState(false);
  const [topDeltaY, setDeltaY] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [originalPosOfLastPressed, setLastPressed] = useState(0);

  const handleMouseDown = (pos, pressY, { pageY }) => {
    console.log('mouseDown');
    setDeltaY(pageY - pressY);
    setMouseY(pressY);
    setPressed(true);
    setLastPressed(pos);
  };

  const handleMouseMove = ({ pageY }) => {
    console.log('mouse move');
    if (isPressed) {
      const newMouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(newMouseY / 100), 0, preferenceList.length - 1);
      let newOrder = preferenceList;

      if (currentRow !== originalPosOfLastPressed) {
        newOrder = reinsert(
          preferenceList,
          originalPosOfLastPressed,
          currentRow,
        );
      }

      setMouseY(newMouseY);
      setList(newOrder);
    }
  };

  const handleTouchStart = (key, pressLocation, e) => {
    console.log('touch start');
    handleMouseDown(key, pressLocation, e.touches[0]);
  };

  const handleTouchMove = useCallback((e) => {
    console.log('touche move');
    e.preventDefault();
    handleMouseMove(e.touches[0]);
  }, [handleMouseMove]);

  const handleMouseUp = () => {
    console.log('up');
    setPressed(false);
    setDeltaY(0);
  };

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleTouchMove]);

  console.log(isPressed, topDeltaY, mouseY, originalPosOfLastPressed);

  return (
    <div>
      {preferenceList.map((name, index) => {
        const style = originalPosOfLastPressed === index && isPressed
          ? {
            scale: spring(1.1, springConfig),
            y: mouseY,
          }
          : {
            scale: spring(1, springConfig),
            y: spring(index * 100, springConfig),
          };

        return (
          <Motion style={style} key={name}>
            {({ scale, y }) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <div
                role="list"
                onMouseDown={(e) => handleMouseDown(index, y, e)}
                onTouchStart={(e) => handleTouchStart(index, y, e)}
                className="demo8-item"
                style={{
                  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  zIndex: index === originalPosOfLastPressed ? 99 : index,
                }}
              >
                {name}
              </div>
            )}
          </Motion>
        );
      })}
    </div>
  );
};

export default ProjectPreference;
