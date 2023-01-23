import CategoryCard from "./CategoryCard"
import {useSelector} from 'react-redux'

function CategoriesList(){
    const {unAcceptedCategories} =useSelector(state=>state.category)
    return (<>
    <div className="row w-100  " style={{"margin":"auto"}}>
    {unAcceptedCategories&&unAcceptedCategories.map((category,index)=><>

        <div className="col-sm-6 col-md-4 col-lg-3 my-1  ">
        <CategoryCard category={category} index={index} />
        </div>
    </>)}
 
    </div>
    </>)
}
export default CategoriesList