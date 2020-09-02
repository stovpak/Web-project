import Cookies from "universal-cookie";

let cookies = new Cookies();
let Token;
const optionsCookies={path:"/",maxAge:604800}
export function getCookiesName(name) {
  return cookies.get("username");
}
export function setCookiesName(name) {
  return cookies.set("username", name, optionsCookies);
}
export const getJwt = () => {
  return cookies.get("sessionToken");
};
export const setSession = token => {
  return cookies.set("sessionToken", token,optionsCookies);
};

export let AuthRequest = { login: "", password: "" };
export let SignUpRequest = { login: "", password: "", email: "" };
export let TopicRequest = { login: "", topicName: "" };
export let EmailChanges = { email: "" };
export let PasswordChanges = { password: "" };
export let Data = { firstName: "", lastName: "", birthday: "" };
export let restorePasswordInfo = { email:"", password: "", key:"" };
export let  emailSave="";