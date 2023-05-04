import ConceptsAddedCard from "./ConceptsAddedCard"
function ConceptsAddedList(){
    return(<>
         <div className="row w-100 text-center" style={{"margin":"auto"}}>
      <div className=' col-sm-8 col-md-6 col-lg-4 my-1'>
      <ConceptsAddedCard/>
      </div>
      <div className=' col-sm-8 col-md-6 col-lg-4 my-1'>
      <ConceptsAddedCard/>
      </div>
      <div className=' col-sm-8 col-md-6 col-lg-4 my-1'>
      <ConceptsAddedCard/>
      </div>
      <div className=' col-sm-8 col-md-6 col-lg-4 my-1'>
      <ConceptsAddedCard/>
      </div>
      </div>
    </>)
}
export default ConceptsAddedList




