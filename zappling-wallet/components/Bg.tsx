import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const SvgBackground = () => (
  <Svg style={StyleSheet.absoluteFill}>
    <Defs>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" style={{ stopColor: '#4c8cff', stopOpacity: 1 }} />
        <Stop offset="100%" style={{ stopColor: '#1d6c99', stopOpacity: 1 }} />
      </LinearGradient>
    </Defs>
    <Rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      fill="url(#grad)"
    />
  </Svg>
);


export default SvgBackground
