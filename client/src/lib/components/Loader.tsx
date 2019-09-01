import React, { useState, useEffect } from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

import { colors } from 'lib/styles';

const PoseBox = posed.div({
  visible: {
    rotate: '0deg',
    transition: { type: 'spring', stifness: 110, damping: 15, mass: 1.5 },
  },
  hidden: {
    rotate: '360deg',
    transition: { type: 'spring', stifness: 110, damping: 15, mass: 1.5 },
  },
});

const Circle = styled(PoseBox)<{ size?: number }>`
  width: ${({ size }) => `${size || 10}rem`};
  height: ${({ size }) => `${size || 10}rem`};

  &::after {
    content: ' ';
    display: block;
    width: ${({ size }) => `${size || 10}rem`};
    height: ${({ size }) => `${size || 10}rem`};
    border-radius: 50%;
    border: ${({ size }) => `${(size || 10) / 20}rem`} solid
      ${colors.primaryDark};
    border-color: ${colors.primaryDark} transparent ${colors.primaryDark}
      transparent;
  }
`;

interface Props {
  size: number;
}

const Loader: React.FC<Props> = ({ size }) => {
  const [rotated, setRotated] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setRotated(prevVis => !prevVis), 500);
    return () => clearInterval(interval);
  }, []);

  return <Circle size={size} pose={rotated ? 'visible' : 'hidden'} />;
};

export default Loader;
