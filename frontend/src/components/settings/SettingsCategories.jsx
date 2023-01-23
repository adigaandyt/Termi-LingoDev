import CategoriesList from "./CategoriesList"
import {getUnAcceptedCategories} from '../../features/categories/categorySlice'
import {useDispatch} from 'react-redux' 
import {useEffect} from 'react'
function SettingsCategories(){
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getUnAcceptedCategories())
    },[])
    return<>
        <div className="text-center">
            <CategoriesList/>
        </div>
    </>
}
export default SettingsCategories