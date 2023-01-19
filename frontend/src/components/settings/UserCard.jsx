import '../../styles/SettingsUsers.css'
import { useSelector,useDispatch } from 'react-redux';
function UserCard(){
    const dispatch=useDispatch();
    const {name,email,profile_image,games_coins,gender,added_concepts} =useSelector(state=>state.auth.user)
    return(<>

        <div class="cardUser green">
            <div class="additional">
            <div class="user-card-image">
                <svg id="user-image" width="110" height="110" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" class="center">
                    <circle cx="125" cy="125" r="120" fill="rgba(0,0,0,0.15)" />    
                </svg>
                <div id="points">
                
                    {games_coins} Coins
                </div>
            </div>
            <div class="more-info">
                <h3>{name}</h3>
                <div class="coords">
                    <span>Category :</span>
                    <span>Joined January 2019</span>
                </div>
                <div class="coords">
                    <span>Position/Role</span>
                </div>
                <div class="stats row">
                    <div>
                        <div class="titleUser">Awards</div>
                            <i class="fa fa-trophy"></i>
                        <div class="value">2</div>
                    </div>
                    <div>
                        <div class="titleUser">Matches</div>
                            <i class="fa fa-gamepad"></i>
                        <div class="value">27</div>
                    </div>
                    <div>
                        <div class="titleUser" id="title-add">concepts add</div>
                            <i class="fa fa-group"></i>
                        <div class="value">{added_concepts}</div>
                    </div>

                </div>
            </div>
            </div>
            <div class="general">
                <h3>{name}</h3>
                <p>{email}</p>
                <span id="more">Mouse over the card for more info</span>
            </div>
        </div>
    </>)
}
export default UserCard