import React, { Fragment, useState, useRef, useEffect } from 'react'
import { css } from '@emotion/css'
import SliderContent from './SliderContent'
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';

// utils function
const getWidth = () => window.innerWidth;

const Slider = props => {
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  })
  const { activeIndex, translate, transition } = state;
  const autoPlayRef = useRef();

  // have useEffect runs everytime after re-render content
  // so that autoPlayRef.current will always get the update activeIndex inside function nextSlide 
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  })

  useEffect(() => {
    // Implement clousure
    const play = () => {
      autoPlayRef.current();
    };

    if (props.autoPlay !== null) {
      const interval = setInterval(play, props.autoPlay * 1000)
      return () => clearInterval(interval);
    }
    
  }, [props.autoPlay])

  const nextSlide = () => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        activeIndex: 0,
        translate: 0
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth()
    })
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        activeIndex: props.slides.length -1,
        translate: (props.slides.length -1) * getWidth()
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth()
    })
  };

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
      
      {!props.autoPlay && (
        <Fragment>
          <Arrow direction="left" handleClick={prevSlide}/>
          <Arrow direction="right" handleClick={nextSlide}/>
        </Fragment>
      )}
      
      <Dots slides={props.slides} activeIndex={activeIndex}/>
    </div>
  )
}

// if autoplay is null, we will show the arrows
// if autoplay is pass as a props, we will hide the arrows
Slider.defaultProps = {
  slides: [],
  autoPlay: null
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
