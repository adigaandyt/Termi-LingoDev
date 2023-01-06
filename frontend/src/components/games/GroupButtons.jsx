import { Link } from "react-router-dom"

function GroupButtons({start,onExit,isEnd}){
    return(<>
    <div className="html_for_game_buttons">
	<div id="buttons_game_containet">
	    {!isEnd?<button onClick={start} id="game_button">Start</button>:<button onClick={start} id="game_button">Play Again</button>}
	    <Link to='/games/gesstheterm/settings' id="game_button">Settings</Link>
	    <button onClick={onExit} id="game_button">Exit Game</button>
	</div>
	</div>
    </>)
}
export default GroupButtons