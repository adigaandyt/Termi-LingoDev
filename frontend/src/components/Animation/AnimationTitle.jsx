import $ from 'jquery'
import { useEffect } from 'react';



function AnimationTitle({text1,text2,text3}){
 
    return(<>
  
    <div class="container-title">
      <span class="text1">{text1}</span>
      <span class="text3">{text2}</span>
      <span class="text2">{text3}</span>
    </div>
    </>)
}
export default AnimationTitle