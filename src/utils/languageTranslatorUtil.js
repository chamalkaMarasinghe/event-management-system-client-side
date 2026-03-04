import { stringTemplates } from "../config/Static_content_Client";

export function languageTranslatorUtil(language, ...properties) {

  let value = stringTemplates;
 // console.log("came inside the function");
  for (const prop of properties) {
  //  console.log("came inside the for loop")
    value = value?.[prop];
    // console.log(value);
    if (value === undefined){
      //console.log("no property");
       return null;
    }
  }

  
  return value[language?.toUpperCase()] ;


}


