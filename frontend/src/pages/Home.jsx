import Header from '../components/Header'
import {useSelector} from 'react-redux'

function Home(){
    const {user} =useSelector(state=>state.auth)
    return (
        <div>
            <div className='mt-5 py-5 text-center'>
               <h1> home </h1>
               {user&&<h3 className='text-success'>You are connected with {user.email}</h3>}
            </div>
        </div>
    )
}
export default Home