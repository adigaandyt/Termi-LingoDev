import  {useState} from 'react'
import UsersList from './UsersList';
import {useDispatch} from 'react-redux'
import { getUsersByTextSearch } from '../../features/auth/authSlice';

function SettingsUsers(){
    const dispatch =useDispatch();
    const [textSearch,setTextSearch] =useState('');
    const onChange=(e)=>{
        e.preventDefault()
        setTextSearch(e.target.value)
        if(e.target.value.length<10)
        dispatch(getUsersByTextSearch(e.target.value))


    }
    const onSubmit =(e)=>{
        e.preventDefault()
        dispatch(getUsersByTextSearch(textSearch))
        console.log(textSearch)

    }
    return<>
        <div class="text-center input-user">
        <form onSubmit={onSubmit}>
            <input value={textSearch} onChange={onChange} class="" id="inputUser" type="text"/>
            <button id="buttonUser" class="fa fa-3x fa-search" type="submit"></button>
            <p class="article"><strong>User not found !</strong></p>
        </form>
        </div> 
        <UsersList/>
    </>
}
export default SettingsUsers