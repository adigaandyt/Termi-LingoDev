import {Link} from 'react-router-dom'

function ConceptsAddedCard(){
    const concepts={
        conceptName:{
            english:'HR planning',
            arabic:'دائرة',
            hebrew:'לולאה',
        },
        categoryID:'639d8f0987cdf6706e335db9',
        categoryname:{
            english:'software',
            arabic:'البرمجة',
            hebrew:'תוכנה',
        },
        shortDefinition:{
            english:'english_definition',
            arabic:'arabic_definition',
            hebrew:'hebrew_definition',
        }
    }
    return(<>
    <div class="card w-100 text-start" >
  <div class="card-body">
    <h5 class="card-title">{concepts.conceptName.english}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{concepts.categoryname.english}</h6>
    <p class="card-text">{concepts.shortDefinition.english}</p>
    <Link to={`/search/${concepts.conceptName.english}/${concepts.categoryID}`}>more</Link>
  </div>
</div>
    </>)
}
export default ConceptsAddedCard