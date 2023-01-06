

// // import React, { useState, useEffect,useRef } from 'react';
// // import {MdOutlineAddAPhoto} from 'react-icons/md'
// // import $ from 'jquery'
// // import '../styles/CarouselDefinition.css'
// // import Definitions from '../components/Definitions'
// // import {CgScrollH} from 'react-icons/cg'
// // import "/node_modules/flag-icons/css/flag-icons.min.css";

// // import {useSelector,useDispatch} from 'react-redux'

// // function TestComponent() {
// //     const {concept}= useSelector(state=>state.concept)
// //     const [languageChoosed,setLanguageChoosed]=useState({
// //       english:true,
// //       hebrew:false,
// //       arabic:false,
// //   })
// //     return (<>

// //     <div className=' mt-150 text-center'>
// //     <div id="carouselExample" class="carousel slide">
// //   <div class="carousel-inner">
// //     <div class="carousel-item active">
// //     <div className='carousel-item-inside'>
// //         {/* english */}
        
// //         <span id="home-flages3" className="fi fi-us mt-3"></span>
// //         <br/>                
// //         <CgScrollH style={{"fontSize":"150%"}}/>

// //         <Definitions languageChoosed={languageChoosed} concept={concept}/>
// //       </div>     
// //     </div>
// //     <div class="carousel-item">
// //       <div className='carousel-item-inside'>
// //         {/* hebrew */}
// //         <span id="home-flages3" className="fi fi-il mt-3"></span>                
// //         <br/>                
// //         <CgScrollH style={{"fontSize":"150%"}}/>
// //         <Definitions languageChoosed={{english:false,hebrew:true,arabic:false,}} concept={concept}/>

// //       </div>      
// //     </div>
// //     <div class="carousel-item">
// //       <div className='carousel-item-inside'>
// //       {/* arabic */}
// //       <span id="home-flages3" className="fi fi-sa mt-3"></span>                
// //       <br/>                
// //         <CgScrollH style={{"fontSize":"150%"}}/>
// //       <Definitions languageChoosed={{english:false,hebrew:false,arabic:true,}} concept={concept}/>

// //       </div>     
// //     </div>
// //   </div>
// //   <button class="carousel-control-prev text-dark d-none d-sm-inline" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
// //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
// //     <span class="visually-hidden">Previous</span>
// //   </button>
// //   <button class="carousel-control-next text-dark d-none d-sm-inline" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
// //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
// //     <span class="visually-hidden">Next</span>
// //   </button>
// // </div>



// // </div>
    

// //     </>)}



// // export default TestComponent;


// //---------------------------------------------------------------------------------------------------//


// import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
// import {TiChevronLeftOutline, TiChevronRightOutline} from 'react-icons/ti';
// import { useSelector } from 'react-redux';
// import Definitions from '../components/Definitions'

// const CARDS = 3;
// const MAX_VISIBILITY = 2;

// const Card = ({title,concept}) => {
//   if(title===1){
//     return(
//     <div className='bg-light card-carousel2'>
//       {/* hebrew*/}             
//       <Definitions languageChoosed={{english:false,hebrew:true,arabic:false,}} concept={concept}/>
//     </div>
//     )
//   }else if(title===2){
//     return(
//       <div className='bg-light card-carousel2'>
//       {/* arabic */}             
//       <Definitions languageChoosed={{english:false,hebrew:false,arabic:true,}} concept={concept}/>
//       </div> 
//     )
//   }else if(title===3){
//     return(
//     <div className='bg-light card-carousel2'>
//       {/* english */}        
//       <Definitions languageChoosed={{english:true,hebrew:false,arabic:false,}} concept={concept}/>
//     </div>
//   )}
// };

// const Carousel = ({children}) => {
//   const [active, setActive] = useState(2);
//   const count = React.Children.count(children);
  
//   return (
//     <div className='carousel'>
//       {active > 0 && <button className='nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline/></button>}
//       {React.Children.map(children, (child, i) => (
//         <div className='card-container' style={{
//             '--active': i === active ? 1 : 0,
//             '--offset': (active - i) / 3,
//             '--direction': Math.sign(active - i),
//             '--abs-offset': Math.abs(active - i) / 3,
//             'pointer-events': active === i ? 'auto' : 'none',
//             'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
//             'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
//           }}>
//           {child}
//         </div>
//       ))}
//       {active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline/></button>}
//     </div>
//   );
// };

// const TestComponent= () => {
  
//   const {concept}= useSelector(state=>state.concept)

//   return(
//   <div className='app ' id='body'>
//     <Carousel>
//       {[...new Array(CARDS)].map((_, i) => (
//         <Card concept={concept} title={ (i + 1)} content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'/>
//       ))}



//     </Carousel>
//   </div>
// )};

// export default TestComponent
//--------------------------------------------------------------------------

import React, { useState,useRef } from 'react';
import {FaUserAlt} from 'react-icons/fa'
import {AiFillSound} from 'react-icons/ai'
import {FiMenu} from 'react-icons/fi'
import Countdown from 'react-countdown-now';
// import Speech from 'react-speech-kit';
const TestComponent= () => {

  return(
 <>
   <div className="moon mt-150 text-center">
      <svg width="100" height="100">
        <path d="M50,1C23.8,1,1,23.8,1,50s22.8,49,50,49s49-22.8,49-50S76.2,1,50,1z M77.7,47.3C77.7,62,62.6,77.1,47.9,77.1
          S18.2,62,18.2,47.3s14.6-29.8,29.3-29.8S77.7,32.6,77.7,47.3z M47.9,69.9c-9.7,0-17.6-7.8-17.6-17.6c0-9.7,7.8-17.6,17.6-17.6
          s17.6,7.8,17.6,17.6C65.5,62.1,57.6,69.9,47.9,69.9z"
        />
      </svg>
    </div>
 </>
)};

export default TestComponent