
import UsersList from './UsersList';

function SettingsUsers(){
    return<>
        <div class="text-center input-user">
            <input class="fa fa-3x" id="inputUser" type="text"/>
            <button id="buttonUser" class="fa fa-3x fa-search"></button>
            <p class="article"><strong>User not found !</strong></p>
        </div>
        <UsersList/>
    </>
}
export default SettingsUsers