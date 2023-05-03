import cookies from "js-cookie"
import { useSelector } from "react-redux"


//translate the name by cookies
export const getCategoryName=(categoryNames)=>{
    switch(cookies.get('i18next')){
        case 'en':{
            return categoryNames.english
        }
        case 'hb':{
            return categoryNames.hebrew
        }
        case 'ar':{
            return categoryNames.arabic
        }
    }}
//translate the name by language choosed by user from the Home.jsx component
export const getCategoryName1=(categoryNames,languageChoosed)=>{
    switch(true){
        case languageChoosed.english:{
            return categoryNames.english
            break;
        }
        case languageChoosed.hebrew:{
            return categoryNames.hebrew
            break;
        }
        case languageChoosed.arabic:{
            return categoryNames.arabic
            break;
        }
    }}
//@des search category by id and call another function to get the category name with a specific language
  export  const categoryById=(id,languageChoosed,categories)=>{
        if(categories){
            const result= categories.find((item) => item._id === id);
            return getCategoryName1(result.categoryName,languageChoosed);
        }
    }

   export  const getConceptName =(languageChoosed,concept)=>{
        
        switch(true){
            case languageChoosed.english :{
                return concept.conceptName.english
                break;
            }
            case languageChoosed.arabic :{
                return concept.conceptName.arabic
               
                break;
            }
            case languageChoosed.hebrew :{
                return concept.conceptName.hebrew
               
                break;
            }

            default:break
        }
      
        
    }
    //get concept name with the cookies language
    export  const getConceptNameCookies =(concept)=>{
        
        switch(cookies.get('i18next')){
            case 'en':{
                return concept.conceptName.english
            }
            case 'hb':{
                return concept.conceptName.hebrew
            }
            case 'ar':{
                return concept.conceptName.arabic
            }
        }
      
        
    }
    //get categoryname by id with the default language choosed.
    export const getCategoryNameById=(categories,categoryId)=>{
    if(categories){
        const mycateg = categories.find(object => object._id === categoryId);
        switch(cookies.get('i18next')){
            case 'en':{
                return mycateg.categoryName.english
            }
            case 'hb':{
                return mycateg.categoryName.hebrew
            }
            case 'ar':{ 
                return mycateg.categoryName.arabic 
            }
        }
    }

    
    }

    // Pass concept and return concept Id.
    export const getConceptId=(concept)=>{
        return concept._id
    }





