import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getConcepts4GuessTerm } from "../../features/Games/gamesSlice";
import {getConceptsNames} from '../../features/concepts/conceptSlice';
import { useDispatch , useSelector } from "react-redux";
import './GamesPage.css';
import {AiTwotoneLike, AiTwotoneDislike} from 'react-icons/ai';
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
    

    
        <div className="cards">
        <div className="card" onClick={toggleGame1}>
            {/* <div class="card-image"></div> */}
            <div className="card-info">
                <div className="card-title">Guess The Term</div>
                <div className="card-detail">{t('description1')}</div>
                <Link to='/games/gesstheterm'><a className="play-btn"></a></Link>
            </div>    
            {/*<div className="card-social">
            <ul>
                <li id="li-btn"><button className="card-btn"><AiTwotoneLike/></button></li>
                <li id="li-btn"><button className="card-btn"><AiTwotoneDislike/></button></li>
            </ul>
            </div>*/}
        </div>
        <div className="card" onClick={toggleGame2}>
            {/*<div className="card-image"></div>*/}
            <div className="card-info">
                <div className="card-title">Game 2</div>
                <div className="card-detail"></div>
                <Link to='/games/gesstheterm'><a className="play-btn"></a></Link>
            </div>
            {/*<div className="card-social">
                <ul>
                    <li id="li-btn"><button className="card-btn"><AiTwotoneLike/></button></li>
                    <li id="li-btn"><button className="card-btn"><AiTwotoneDislike/></button></li>
                </ul>
            </div>*/}
        </div>
        
        
        </div>
      
    </>)
}
export default GamesPage