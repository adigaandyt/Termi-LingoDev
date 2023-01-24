import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getTop5UsersForGuessTheTerm } from "../../features/auth/authSlice";
function GroupButtons({start,onExit,isEnd}){
	const dispatch=useDispatch()
	const {t} = useTranslation();
    return(<>
    <div className="html_for_game_buttons ">
	<div id="buttons_game_containet">
	    {!isEnd?<button onClick={start} id="game_button">{t('start')}</button>:<button onClick={start} id="game_button">{t('play again')}</button>}
	    <Link to='/games/gesstheterm/settings' id="game_button">{t('settings')}</Link>
		<Link to='/games/gesstheterm/top5' onClick={()=>dispatch(getTop5UsersForGuessTheTerm())} id="game_button">Top 5</Link>
	    <button onClick={onExit} id="game_button">{t('exit-game')}</button>
	</div>
	</div>
    </>)
}
export default GroupButtons