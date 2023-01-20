import '../../styles/SettingsUsers.css'
import { useSelector,useDispatch } from 'react-redux';
function UserCard(){
    const dispatch=useDispatch();
    const {name,email,profile_image,games_coins,gender,added_concepts} =useSelector(state=>state.auth.user)
    return(<>
        <div className='userContainer  ' style={{"margin":"auto"}}>

        
        <div className="cardUser green">
            <div className="additional">
            <div className="user-card-image">
                <svg id="user-image" width="110" height="110" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" class="center">
                    <circle cx="125" cy="125" r="120" fill="rgba(0,0,0,0.15)" />    
                </svg>
                <div className='text-center' >
                <div id="points" >
                    {games_coins} Coins
                </div>
                </div>
            </div>
            <div className="more-info">
                <h3>{name}</h3>
                <div className="coords">
                    <span>Category :</span>
                    <span>Joined January 2019</span>
                </div>
                <div className="coords">
                    <span>Position/Role</span>
                </div>
                <div className="stats row">
                    <div>
                        <div className="titleUser">Awards</div>
                            <i className="fa fa-trophy"></i>
                        <div className="value">2</div>
                    </div>
                    <div>
                        <div className="titleUser">Matches</div>
                            <i className="fa fa-gamepad"></i>
                        <div className="value">27</div>
                    </div>
                    <div id='icon-card'>
                        <div className="titleUser" id="title-add">concepts add</div>
                            <i className="fa fa-group"></i>
                        <div className="value">{added_concepts}</div>
                    </div>

                </div>
            </div>
            </div>
            <div className="general">
                <h3>{name}</h3>
                <p>{email}</p>
                <span id="more">Mouse over the card for more info</span>
            </div>
        </div>
        </div>
    </>)
}
export default UserCard