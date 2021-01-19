import React from 'react';
import styled from '@emotion/styled';

// Overflow the Slider component and this will place other images content off the screen
// give SliderContentthe ability to move back and forth horizontally
// hard code with negative value to slide to the left translateX(-)
const SliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  width: ${props => props.width}px;
  display: flex;
`

export default SliderContent;