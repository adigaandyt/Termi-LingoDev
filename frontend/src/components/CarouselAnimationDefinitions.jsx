



import React, {useState,useRef,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {TiChevronLeftOutline, TiChevronRightOutline} from 'react-icons/ti';
import { useSelector } from 'react-redux';
import Definitions from '../components/Definitions'
import '../styles/CarouselAnimationDefinitions.css'
const CARDS = 3;
const MAX_VISIBILITY = 2;

const Card = ({title,concept}) => {
  if(title===1){
    return(
    <div className='bg-light card-carousel2'>
      {/* hebrew*/}             
      <Definitions languageChoosed={{english:false,hebrew:true,arabic:false,}} concept={concept}/>
    </div>
    )
  }else if(title===2){
    return(
      <div className='bg-light card-carousel2'>
      {/* arabic */}             
      <Definitions languageChoosed={{english:false,hebrew:false,arabic:true,}} concept={concept}/>
      </div> 
    )
  }else if(title===3){
    return(
    <div className='bg-light card-carousel2'>
      {/* english */}        
      <Definitions languageChoosed={{english:true,hebrew:false,arabic:false,}} concept={concept}/>
    </div>
  )}
};

const Carousel = ({children}) => {
  const {concept}=useSelector(state=>state.concept)
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);
  const [position, setPosition] = useState(0);
  const handleRef = useRef(null);
  useEffect(()=>{
    console.log(active);
    console.log(concept);
  },[active])
  const handleTouchStart = (event) => {
    event.preventDefault();
    const initialX = event.touches[0].clientX;
    const initialPosition = position;
    const onTouchMove = (event) => {
      const minPosition = 0;
      const maxPosition = 200;
      const newPosition = Math.max(minPosition, Math.min(maxPosition, initialPosition + (event.touches[0].clientX - initialX)));
      setPosition(newPosition);
    };
    const onTouchEnd = (event) => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      console.log(initialX)
      console.log(event.changedTouches[0].clientX)
      if (event.changedTouches[0].clientX > initialX+35) {
        console.log('Moved to the right');
        if(active > 0){
          setActive(i => i - 1)
        }
      } else if (event.changedTouches[0].clientX < initialX-35) {
        console.log('Moved to the left');
        if(active < count - 1){
          setActive(i => i + 1)
          
        }
      }
    };
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };
  const onLeft=()=>{
    setActive(i => i - 1)
    // console.log(concept);
    // console.log(active);
  }
  const onRight=()=>{
    setActive(i => i + 1)
    // console.log(concept);
    // console.log(active);
  }
  return (
    <div ref={handleRef}  onTouchStart={handleTouchStart} className='carousel' >
      {active > 0 && <button className='nav left' onClick={onLeft}><TiChevronLeftOutline/></button>}
      {React.Children.map(children, (child, i) => (
        <div className='card-container' style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointerEvents': active === i ? 'auto' : 'none',
            'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}>
          {child}
        </div>
      ))}
      {active < count - 1 && <button className='nav right' onClick={onRight}><TiChevronRightOutline/></button>}
    </div>
  );
};

const CarouselAnimationDefinitions= () => {
  
    const {concept}= useSelector(state=>state.concept)
  
    return(
    <div className=' ' id='body'>
      <Carousel concept={concept}>
        {[...new Array(CARDS)].map((_, i) => (
          <Card concept={concept} title={ (i + 1)} content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'/>
        ))}
  
      </Carousel>
    </div>
  )};
  
  export default CarouselAnimationDefinitions