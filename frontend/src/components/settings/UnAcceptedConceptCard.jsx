import {FiEdit2} from 'react-icons/fi'
import {useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import {categoryById} from '../../hooks/ExportsFunctions'
import EditConceptModal from './EditConceptModal';


function UnAcceptedConceptCard ({concept,index}){
    const {unAcceptedConcepts}=useSelector(state=>state.concept)
    const {categories}=useSelector(state=>state.category)
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
    return(<>
    <div class="card text-center">
  {/* <div class="card-header">
    Featured
  </div> */}
  <EditConceptModal key={index} concept={concept} index={index} basicModal={basicModal} setBasicModal={setBasicModal} toggleShow={toggleShow}/>

  <div class="card-body text-start">
    <h5 class="card-title">{concept.conceptName.english}</h5>
    <p class="card-text">{categoryById(concept.categories[0],{english:true,arabic:false,hebrew:false},categories)}</p>
    <div className="text-end my-0">
    <button onClick={toggleShow} className='btn text-end text-green'><FiEdit2/></button>
    </div>
  </div>
  <div class="card-footer text-muted">
  Suggested By :{concept.suggestedBy  } 
  </div>
</div>
    </>)
}   
export default UnAcceptedConceptCard