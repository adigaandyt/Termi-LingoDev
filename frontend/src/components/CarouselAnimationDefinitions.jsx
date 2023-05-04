



import React, {useState,useRef,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {TiChevronLeftOutline, TiChevronRightOutline} from 'react-icons/ti';
import { useSelector } from 'react-redux';
import Definitions from '../components/Definitions'
import '../styles/CarouselAnimationDefinitions.css'
import {sendLanguageChange} from '../features/logging/loggingSlice'
import {useDispatch} from 'react-redux'


const CARDS = 3;
const MAX_VISIBILITY = 2;

const Card = ({title,concept,alertShow,alertToggleShow}) => {
  if(title===1){
    return(
    <div className='bg-light card-carousel2'>
      {/* hebrew*/}             
      <Definitions alertShow={alertShow} alertToggleShow={alertToggleShow} languageChoosed={{english:false,hebrew:true,arabic:false,}} concept={concept}/>
    </div>
    )
  }else if(title===2){
    return(
      <div className='bg-light card-carousel2'>
      {/* arabic */}             
      <Definitions alertShow={alertShow} alertToggleShow={alertToggleShow} languageChoosed={{english:false,hebrew:false,arabic:true,}} concept={concept}/>
      </div> 
    )
  }else if(title===3){
    return(
    <div className='bg-light card-carousel2'>
      {/* english */}        
      <Definitions alertShow={alertShow} alertToggleShow={alertToggleShow} languageChoosed={{english:true,hebrew:false,arabic:false,}} concept={concept}/>
    </div>
  )}
};

const Carousel = ({children,concept}) => {
  const dispatch =useDispatch();

  // const {concept}=useSelector(state=>state.concept)
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);
  const [position, setPosition] = useState(0);
  const handleRef = useRef(null);
  
  // useEffect(()=>{
  //   console.log("------------------")
  //   console.log(active);
  //   console.log(concept);
  //   const data={
  //     active:active,
  //     concept:concept
  //   }
  //   dispatch(sendLanguageChange(data))
  //   // sendLanguageChange
  //   console.log("------------------")
  // },[active])

  const languagechange=(change)=>{
        let newActive = active + change
        const data={
          previousLanguage:active,
          newLanguage:newActive,
          categoryID:concept.categories[1],
          conceptID:concept._id
        }
        dispatch(sendLanguageChange(data))
        setActive(newActive)
  }

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
          languagechange(-1)
        }
      } else if (event.changedTouches[0].clientX < initialX-35) {
        console.log('Moved to the left');
        if(active < count - 1){
          languagechange(1)
          
        }
      }
    };
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };
  const onLeft=()=>{
    languagechange(-1)
    // console.log(concept);
    // console.log(active);
  }
  const onRight=()=>{
    languagechange(1)
    // console.log(concept);
    // console.log(active);
  }
  return (
    <div ref={handleRef}  onTouchStart={handleTouchStart} className='carousel' >
      {active > 0 && <button className='nav3 left' onClick={onLeft}><TiChevronLeftOutline/></button>}
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
      {active < count - 1 && <button className='nav3 right' onClick={onRight}><TiChevronRightOutline/></button>}
    </div>
  );
};

const CarouselAnimationDefinitions= ({alertShow,alertToggleShow,concept}) => {
  
    // const {concept}= useSelector(state=>state.concept)
  
    return(
    <div   className=' row' id='body'>
         

      <Carousel concept={concept}>
        {[...new Array(CARDS)].map((_, i) => (
          <Card alertShow={alertShow} alertToggleShow={alertToggleShow} concept={concept} title={ (i + 1)} content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'/>
        ))}
  
      </Carousel>

    </div>
  )};
  
  export default CarouselAnimationDefinitions