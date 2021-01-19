
import React, { useState } from 'react'
import { css } from '@emotion/css'
import SliderContent from './SliderContent'
import Slide from './Slide';

const Slider = props => {
  const getWidth = () => window.innerWidth

  const [state, setState] = useState({
    translate: 0,
    transition: 0.45
  })

  const { translate, transition } = state

  console.log(props)
  return (
    <div className={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth()}
      >
        {props.slides.map((slide, index) => (
          <Slide key={slide} content={slide} />
        ))}
        
      </SliderContent>
    </div>
  )
}

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  ${'' /* background: red; */}
`

export default Slider
