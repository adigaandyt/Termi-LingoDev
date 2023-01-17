import {HiOutlineUsers} from 'react-icons/hi'
import {BiCategoryAlt} from 'react-icons/bi'
import {AiOutlineFileSearch} from 'react-icons/ai'
import {RiHomeGearLine} from 'react-icons/ri'
function SettingsNavbar(){
    return(<>
        <div className="text-center mt-100">
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <button className={"nav-link  btn"}  ><RiHomeGearLine className='display-4 text-green'/></button>
            </li>
            <li className="nav-item">
                <button className="nav-link  btn" ><HiOutlineUsers className='display-4 text-green'/></button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn" ><AiOutlineFileSearch className='display-4 text-green'/></button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn" ><BiCategoryAlt className='display-4 text-green'/></button>
            </li>
 
        </ul>
</div>
    </>)
}
export default SettingsNavbar