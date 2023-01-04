import {useState} from 'react'



export function useRandom(){
   const [rand,setrand]= useState()

   const createRand=(sum)=>{
    const randomInteger = Math.floor(Math.random() * sum);
    setrand(randomInteger)
   }
   return [rand,createRand] 

}