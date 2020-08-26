import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Background: React.FC = () => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#403f3f', '#302d2d']}
      start={[0, 0]}
      end={[1.0, 0]}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      }}
    />
  );
};

export default Background;
