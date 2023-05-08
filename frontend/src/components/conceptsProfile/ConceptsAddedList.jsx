import ConceptsAddedCard from "./ConceptsAddedCard"
function ConceptsAddedList({concepts}){

    return(<>
        <div className="row w-100 text-center mt-3" style={{"margin":"auto","height": "200px", "overflow": "auto"}}>
        {concepts&&concepts.map(((concept,index)=>{
          return(<>
            <div className=' col-sm-8 col-md-6 col-lg-4 my-1 ' >
            <ConceptsAddedCard key={index} concept={concept}/>
            </div>
          </>)
        }))}
        </div>
    </>)
}
export default ConceptsAddedList



