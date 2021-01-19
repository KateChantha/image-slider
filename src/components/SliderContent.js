import React from 'react';
import styled from '@emotion/styled';

// Overfliw the Slider component and place content off the screen
// give SliderContentthe ability to move back and forth horizontally
const SliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 90%;
  width: ${props => props.width}px;
  display: flex;
  background: red;
`

export default SliderContent;