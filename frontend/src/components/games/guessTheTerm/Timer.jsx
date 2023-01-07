import { useEffect, useRef } from 'react';
import Countdown from 'react-countdown';
function Timer({onNextQestion,setTime}){
const countdownRef=useRef(null)
    const onComplete=(e)=>{
        console.log(e.target)
        onNextQestion(false)
        // countdownRef.current.reset()
    }


    return(
    <Countdown 
    ref={countdownRef}
    date={Date.now() + 30000}
    renderer={({ minutes, seconds }) => (
        <h4 className='text-end mx-2 text-light'>{minutes}:{seconds}</h4>
       
      )}
    onComplete={onComplete}
    />
    )
}
export default Timer