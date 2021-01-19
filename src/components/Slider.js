
import React, { useState } from 'react'
import { css } from '@emotion/css'
import SliderContent from './SliderContent'
import Slide from './Slide';
import Arrow from './Arrow'

const Slider = props => {
  const getWidth = () => window.innerWidth

  const [state, setState] = useState({
    translate: 0,
    transition: 0.45
  })

  const { translate, transition } = state

  // width of SliderContent is all images witdth combine
  return (
    <div className={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * props.slides.length}
      >
        {props.slides.map((slide, index) => (
          <Slide key={slide} content={slide} />
        ))}
        
      </SliderContent>
      <Arrow />
      <Arrow />
    </div>
  )
}

// Overflow: hidden the Slider component and this will place other images content off the screen
const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`

export default Slider
