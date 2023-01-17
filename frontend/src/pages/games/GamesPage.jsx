import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getConcepts4GuessTerm } from "../../features/Games/gamesSlice";
import {getConceptsNames} from '../../features/concepts/conceptSlice';
import { useDispatch , useSelector } from "react-redux";
import './GamesPage.css';
import { useTranslation } from 'react-i18next';


// import { GamesProvider } from "../../hooks/gamesContext"

function GamesPage(){
    const {t}=useTranslation();
    const dispatch=useDispatch()
    useEffect(()=>{


    },[])
    const [gamesClicked,setGamesClicked] =useState({
        game1:false,
        game2:false
    })
    const {game1,game2}=gamesClicked
    const toggleGame1=()=>{
        setGamesClicked((prev)=>{
            return({
                game1:!game1,
                game2:false
            })
        })
    }
    const toggleGame2=()=>{
        setGamesClicked((prev)=>{
            return({
                game2:!game1,
                game1:false
            })
        })
    }
    return (<>
        <div dir='ltr' className='row mt-5' id="games-box" >
            <div className='g1-box' onClick={toggleGame1}>
                <Link to='/games/gesstheterm'>
                <div className="icon" id="game-1">
                    
                </div>  
                </Link>
                <h6>Guess The Term</h6>
            </div>
            <div className='g1-box' onClick={toggleGame2}>
                <Link to='/games/transme'>
                <div className="icon" id="game-2">
                    
                </div>  
                </Link>
                <h6>TransMe</h6>
            </div>
         </div>

    </>)
}
export default GamesPage