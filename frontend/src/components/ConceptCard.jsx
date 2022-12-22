
import '../styles/SearchForm.css'

function ConceptCard({concept}){
    return(<>
        <div id='parent '>
            <div class="card my-2 w-100" id='child'>
                <div class="card-body">
                    <h5 class="card-title">{concept._id}</h5>
                    <h6 class="card-subtitle mb-2 text-danger">Card subtitle</h6>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
    </>)
}
export default ConceptCard