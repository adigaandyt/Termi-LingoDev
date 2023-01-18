import {FiEdit2} from 'react-icons/fi'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import {categoryById} from '../../hooks/ExportsFunctions'
function UnAcceptedConceptCard ({concept}){
    const {unAcceptedConcepts}=useSelector(state=>state.concept)
    const {categories}=useSelector(state=>state.category)

    return(<>
    <div class="card text-center">
  {/* <div class="card-header">
    Featured
  </div> */}
  <div class="card-body text-start">
    <h5 class="card-title">{concept.conceptName.english}</h5>
    <p class="card-text">{categoryById(concept.categories[0],{english:true,arabic:false,hebrew:false},categories)}</p>
    <div className="text-end my-0">
    <button class="btn text-green "><FiEdit2/></button>
    </div>
  </div>
  <div class="card-footer text-muted">
  Suggested By :{concept.suggestedBy  }
  </div>
</div>
    </>)
}   
export default UnAcceptedConceptCard