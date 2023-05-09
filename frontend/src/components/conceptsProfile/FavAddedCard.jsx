import {Link} from 'react-router-dom'
import {getCategoryNameById,getConceptNameCookies} from '../../hooks/ExportsFunctions'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import cookies from "js-cookie"
import '../../styles/ConceptsAddedCard.css'
// import getUserConceptsAdded from '../features/conceptsProfile/conceptProfileSlice'

function FavAddedCard({concept}){
    const {t}=useTranslation()
const {categories}=useSelector(state=>state.category)
const dateObj = new Date(concept.createdAt);
    return(<>
    <div class={cookies.get('i18next')=='en'?'card w-100 text-start':'card w-100 text-end'} >
  <div className="card-body">
    <h5 className="card-title">{getConceptNameCookies(concept)}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{getCategoryNameById(categories,concept.categories[0])}</h6>
    <div className='row' dir='rtl'>
    <Link className='col-4' to={`/search/${concept.conceptName.english}/${concept.categories[0]}`}>{t('search_for')}</Link>
    {/* <p className='col-8'>{concept.createdAt?`${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}-${dateObj.getHours()}:${dateObj.getMinutes()}`:t('no_date_defined')}</p> */}
    </div>
  </div>
</div>
    </>)
}
export default FavAddedCard