import React, { Fragment, useState, useRef, useEffect } from 'react'
import { css } from '@emotion/css'
import SliderContent from './SliderContent'
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';

// utils function
const getWidth = () => window.innerWidth;

const Slider = props => {
  const { slides } = props;
  const firstSlide = slides[0]
  const secondSlide = slides[1]
  const lastSlide = slides[slides.length - 1]

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide]
  })
  const { activeSlide, translate, transition, _slides } = state;
  // useRef to presist state throughout app life cycle
  const autoPlayRef = useRef();
  const transitionRef = useRef();

  // RUNS EVERYTIME
  // to update autoPlayRef.current with the update activeSlide inside function nextSlide 
  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
  })

  // RUNS ONCE to setup interval - we want this useEffect to run only once, that's why we use useRef and pass autoPlayRef.current() as a clousure to setInterval
  useEffect(() => {
    // Implement clousure to return autoPlayRef.current()which always refer to 
    // the update function nextSlide with update activeSlide
    const play = () => {
      autoPlayRef.current();
    };

    const smooth = (e) => {
      if (e.target.className.includes('sliderContent')) {
        transitionRef.current();
      }
    }

    const transitonEnd = window.addEventListener('transitionend', smooth);
    
    let interval = null;
    if (props.autoPlay !== null) {
      interval = setInterval(play, props.autoPlay * 1000)
    }

    return () => {
      if (props.autoPlay !== null) clearInterval(interval);
      window.removeEventListener('transitionend', transitonEnd);
    }
    
  }, [props.autoPlay])

  /** ====================================
   * NOTE: Alternative approach
   * benefit: don't need useRef, and another useEffect to run everytime 
   * Tradeoff: this useUseEffect will run everytime that the nextSlide update and it will cause setInterval to run multiple times
   * ------------------------------------
   * useEffect(() => {
        const play = () => {
          nextSlide();
        };
        
        if (props.autoPlay !== null) {
          const interval = setInterval(play, props.autoPlay * 1000)
          return () => clearInterval(interval);
        }
        
      }, [nextSlide])
    * =======================================
   */

  const smoothTransition = () => {
    let _slides = []

    // We're at the last slide.
    if (activeSlide === slides.length - 1)
      _slides = [slides[slides.length - 2], lastSlide, firstSlide]
    // We're back at the first slide.
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]
    // Create an array of the previous last slide, and the next two slides that follow it.
    // [ slides[activeSlide - 1], slides[activeSlide], slides[activeSlide + 1] ]
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2)

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth()
    })
  }

  const nextSlide = () =>
    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    })

  const prevSlide = () =>
    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    })

  // width of SliderContent is all images witdth combine
  return (
    <div className={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * _slides.length}
      >
        {_slides.map((slide, index) => (
          <Slide key={slide + index} content={slide} />
        ))}
      </SliderContent>
      
      {!props.autoPlay && (
        <Fragment>
          <Arrow direction="left" handleClick={prevSlide}/>
          <Arrow direction="right" handleClick={nextSlide}/>
        </Fragment>
      )}
      
      <Dots slides={props.slides} activeSlide={activeSlide}/>
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
