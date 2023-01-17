import {HiOutlineUsers} from 'react-icons/hi'
import {BiCategoryAlt} from 'react-icons/bi'
import {AiOutlineFileSearch} from 'react-icons/ai'
import {RiHomeGearLine} from 'react-icons/ri'
function SettingsNavbar({isActive,setIsActive}){
    const onHomeClick=(e)=>{
        setIsActive({
            isHomeActive:true,
            isUsersActive:false,
            isConceptsActive:false,
            isCategoriesActive:false,
        })
    }
    const onUsersClick=(e)=>{
        setIsActive({
            isHomeActive:false,
            isUsersActive:true,
            isConceptsActive:false,
            isCategoriesActive:false,
        })
    }
    const onConceptsClick=(e)=>{
        setIsActive({
            isHomeActive:false,
            isUsersActive:false,
            isConceptsActive:true,
            isCategoriesActive:false,
        })
    }
    const onCategoriesClick=(e)=>{
        setIsActive({
            isHomeActive:false,
            isUsersActive:false,
            isConceptsActive:false,
            isCategoriesActive:true,
        })
    }
    return(<>
        <div className="text-center mt-100">
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <button onClick={onHomeClick} className={"nav-link  btn"}  ><RiHomeGearLine className='display-4 text-green'/></button>
            </li>
            <li className="nav-item">
                <button onClick={onUsersClick} className="nav-link  btn" ><HiOutlineUsers className='display-4 text-green'/></button>
            </li>
            <li className="nav-item">
                <button onClick={onConceptsClick} className="nav-link btn" ><AiOutlineFileSearch className='display-4 text-green'/></button>
            </li>
            <li className="nav-item">
                <button onClick={onCategoriesClick} className="nav-link btn" ><BiCategoryAlt className='display-4 text-green'/></button>
            </li>
 
        </ul>
</div>
    </>)
}
export default SettingsNavbar