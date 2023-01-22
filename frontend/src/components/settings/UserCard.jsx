import '../../styles/SettingsUsers.css'
import {TbPlaylistAdd} from 'react-icons/tb'
import {CgGames} from 'react-icons/cg'
import {FcLike} from 'react-icons/fc'
import { useSelector,useDispatch } from 'react-redux';
import { getCategoryNameById } from '../../hooks/ExportsFunctions';
function UserCard({user}){
    const dispatch=useDispatch();
    const {categories} =useSelector(state=>state.category)
    return(<>
        <div className='userContainer  ' style={{"margin":"auto"}}>

        
        <div className="cardUser green">
            <div className="additional">
            <div className="user-card-image">

                <img className='rounded-circle'  id="user-image" width="110" height="110" viewBox="0 0 250 250"  src={user.profile_image}/>

                
                <div className='text-center' >
                <div id="points" >
                    {user.games_coins} Coins
                </div>
                </div>
            </div>
            <div className="more-info">
                <h3>{user.name}</h3>
                <div className="coords">
                    <span>Category :</span>
                    <span>{"saofg"}</span>
                </div>
                <div className="coords">
                    <span>Language: {user.language}</span>
                </div>
                <div className="stats row d-flex justify-content-between">
                    <div>
                        <div className="titleUser">Likes</div>
                        <FcLike className=' display-4 '/>
                        <div className="value">0</div>
                    </div>
                    <div>
                        <div className="titleUser">Matches</div>
                            <CgGames className=' display-4 '/>
                        <div className="value">{user.gamesPlayed}</div>
                    </div>
                    <div id='icon-card'>
                        <div className="titleUser  mb-0" id="title-add">concepts add</div>
                            {/* <i className="fa fa-group"></i> */}
                            <TbPlaylistAdd className=' display-4 '/>
                        <div className="value">{user.added_concepts}</div>
                    </div>

                </div>
            </div>
            </div>
            <div className="general">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <span id="more">Mouse over the card for more info</span>
            </div>
        </div>
        </div>
    </>)
}
export default UserCard