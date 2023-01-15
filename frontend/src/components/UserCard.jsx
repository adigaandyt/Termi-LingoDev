import {GiTrophyCup} from 'react-icons/gi'
import '../styles/userCard.css' 

function UserCard({user,index,color}){
    return (<>
    <div dir='ltr' className="container mt-2 " style={{"position":"relative"}}>
    <div class="user-card-container">
  <div class="svg-background-user-card" style={{"backgroundColor":color}}></div>
  <div class="svg-background2-user-card"></div>
  <div class="circle-user-card"></div>
  {/* <img class="menu-icon-user-card" src="https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png"/> */}
  <img class="profile-img-user-card" src={user.profile_image}/>
  <div class="text-container-user-card">
    <h6 class="title-text-user-card">{user.name}</h6>
    <h6 class="title-text-user-card">{user.email}</h6>
    <h6 class="info-text-user-card">level: {index+1}</h6>
    {index===0&&<h6><GiTrophyCup className='display-6 text-warning'/></h6>}
    {/* <p class="desc-text-user-card">Hello, I am Austin May and I enjoy front-end web development. I fell in love with software development at Marshall University, where I graduated with a Bachelor's in Computer Science. </p> */}
  </div>
</div>


    </div>
    
    
    
    </>)
}
export default UserCard