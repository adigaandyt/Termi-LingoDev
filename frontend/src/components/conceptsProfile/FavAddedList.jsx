import FavAddedCard from "./FavAddedCard"
function FavAddedList({concepts}){

    return(<>
        <div className="row w-100 text-center mt-3" style={{"margin":"auto"}}>
        {concepts&&concepts.map(((concept,index)=>{
          return(<>
            <div className=' col-sm-8 col-md-6 col-lg-4 my-1 ' >
            <FavAddedCard key={index} concept={concept}/>
            </div>
          </>)
        }))}
        </div>
    </>)
}
export default FavAddedList



