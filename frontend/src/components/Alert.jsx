import {useSelector} from 'react-redux'

function Alert(){
    const {user,isLoading,isError,message}=useSelector(state=>state.auth)
    return (
        <>
            <div className="alert"> 
                <strong>Error! ,</strong> {isError&&message}
            </div>
        </>
    )
}
export default Alert