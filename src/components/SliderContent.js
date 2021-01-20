import React from 'react';
import { css } from '@emotion/css'

// Overflow the Slider component and this will place other images content off the screen
// give SliderContentthe ability to move back and forth horizontally
// hard code with negative value to slide to the left translateX(-)
const SliderContent = props => (
  <div
    className={`sliderContent ${css`
      transform: translateX(-${props.translate}px);
      transition: transform ease-out ${props.transition}s;
      height: 100%;
      width: ${props.width}px;
      display: flex;
    `}`}
  >
    {props.children}
  </div>
)

export default SliderContent;