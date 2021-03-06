### Build An Image Slider Carousel With React Hooks

#### Part-1 Slide with Arrows
- using Emotion CSS in JS library.
- Animate the image slider along a horizontal axis with a trick of set the Slider Overflow hidden to conceal non-active images.
- give SliderContent the ability to move back and forth horizontally by applying transform: translateX() and hard code with negative value translateX(-) so the slide move to the left.

#### Part-2 Slide with Autoplay
- Add ability to cycle through the slider without user interaction (should also hide the arrows).
- By passing a prop of autoPlay and by using React Hooks, UseEffect and UseRef to set an interval in our component.
- Use a ref to save current rendered version of the next slide. 
- Two useEffect calls will be used for 
a. To set the ref to the nextSlide
b. to declare the interval and remove it. Note: props.autoplay is a depandency of this useEffect and we should check if it's not a null before setting an interval. 

#### Part-3 Smooth Transition
- create a new array to contain the proper 3 slides.
- create a function to update the proper slides in the new array everytime after slide chaged.
- Event listener: transitioned event is fired when a CSS transition has completed. Use this event listener to trigger our smoothTransition function.
- Handeling browser resize by setting the resize event and write a function to set the proper translate value when resize event has finished. To do so, we will create another ref.


