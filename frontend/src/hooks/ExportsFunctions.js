import cookies from "js-cookie"



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





