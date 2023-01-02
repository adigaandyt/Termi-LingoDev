import { useState } from "react"
import { Link } from "react-router-dom"

function GamesPage(){
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
        <div className="text-center mt-150 row">
            <section className="mx-3 text-center" name='game1' onClick={toggleGame1} id='gamespage-game1'>
                <h1>Guess The Term</h1>
            </section>
            <section className="mx-3" name='game1' onClick={toggleGame1} id='gamespage-game1'>
                Game 2
            </section>
            {game1&&<div className="text-center">
                <h3>Guess The Term</h3>
                <p>Description......</p>
               <Link to='/games/gesstheterm'> <a class="play-btn"></a></Link>
            </div>}
        </div>
    </>)
}
export default GamesPage