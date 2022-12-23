import cookies from "js-cookie"


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





