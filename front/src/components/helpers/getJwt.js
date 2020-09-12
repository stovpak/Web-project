import Cookies from "universal-cookie";
const cookies = new Cookies();
export const getJwt=()=>{
    return cookies.get('sessionToken');
}