import React, { useState, useEffect, useCallback } from 'react';
import { Motion, spring } from 'react-motion/lib/react-motion';


const reinsert = (arr, from, to) => {
  console.log(arr, from, to);
  const output = arr.slice(0);
  const val = output[from];
  output.splice(from, 1);
  output.splice(to, 0, val);
  return output;
};

const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

const springConfig = { stiffness: 300, damping: 50 };
const CATEGORY_NAMES = ['Web', 'Android App', 'iOS App', 'Voice'];
const divHeight = 100;

const ProjectPreference = () => {
  const [preferenceList, setList] = useState(CATEGORY_NAMES);
  const [isPressed, setPressed] = useState(false);
  const [topDeltaY, setDeltaY] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [originalPosOfLastPressed, setLastPressed] = useState(0);

  const handleMouseDown = (pos, pressY, { pageY }) => {
    console.log('Mouse down:', pressY, pageY);
    setDeltaY(pageY - pressY);
    setMouseY(pressY);
    setPressed(true);
    setLastPressed(pos);
  };

  const handleMouseMove = useCallback(({ pageY }) => {
    if (isPressed) {
      const newMouseY = pageY - topDeltaY;
      console.log(newMouseY, pageY, topDeltaY);
      const currentRow = clamp(Math.round(newMouseY / divHeight), 0, preferenceList.length - 1);
      // console.log(currentRow);

      if (currentRow !== originalPosOfLastPressed) {
        const newList = reinsert(
          preferenceList,
          originalPosOfLastPressed,
          currentRow,
        );
        console.log('new list');
        console.log(newList);
        setList(newList);
      }

      setMouseY(newMouseY);
    }
  }, [isPressed, originalPosOfLastPressed, topDeltaY, preferenceList]);

  const handleTouchStart = (key, pressLocation, e) => {
    handleMouseDown(key, pressLocation, e.touches[0]);
  };

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    handleMouseMove(e.touches[0]);
  }, [handleMouseMove]);

  const handleMouseUp = () => {
    setPressed(false);
    setDeltaY(0);
  };

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return function cleanup() {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleTouchMove]);

  // console.log(isPressed, topDeltaY, mouseY, originalPosOfLastPressed);
  // console.log(preferenceList);

  return (
    <div>
      {CATEGORY_NAMES.map((name, index) => {
        const style = originalPosOfLastPressed === index && isPressed
          ? {
            scale: spring(1.1, springConfig),
            y: mouseY ,
          }
          : {
            scale: spring(1, springConfig),
            y: spring(preferenceList.indexOf(name) * divHeight, springConfig),
          };

        return (
          <Motion style={style} key={name}>
            {({ scale, y }) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <div
                role="list"
                onMouseDown={(e) => handleMouseDown(index, preferenceList.indexOf(name) * 100, e)}
                onTouchStart={(e) => handleTouchStart(index, preferenceList.indexOf(name) * 100, e)}
                className="demo8-item"
                style={{
                  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  zIndex: index === originalPosOfLastPressed ? 99 : index,
                  borderStyle: 'solid',
                  height: `${divHeight}px`,
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
