

import React, { useState, useEffect } from 'react';
import {MdOutlineAddAPhoto} from 'react-icons/md'
import '../styles/TestComponent.css'
function TestComponent() {

    return (<>

    <div id='comp-img2' className='mt-150 text-center'>
      <div id='image2' >
      {true&&<div class="spinner-border  text-light " id='spinner-grow' role="status">
              {<span class="sr-only">Loading...</span>}
            </div>}
            <MdOutlineAddAPhoto id='img-icon2'/>

      </div>
    </div>
    </>)}



export default TestComponent;
