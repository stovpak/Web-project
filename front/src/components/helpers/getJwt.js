import Cookies from "universal-cookie";
import {string} from "yup";
const cookies = new Cookies();
export const getJwt=()=>{
    return cookies.get('sessionToken');
}
export const setToken=(token)=>{
    return cookies.set("sessionToken", token);}