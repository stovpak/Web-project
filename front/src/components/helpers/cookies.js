import Cookies from 'universal-cookie';
let cookies = new Cookies();
 export function getCookiesName(name){
     return cookies.get("username");
 }
export function setCookiesName(name){
    return cookies.set("username", name);
}
export function setSession(value) {
    return cookies.set("sessionToken", value);
    
}