import Cookies from "universal-cookie";
let cookies = new Cookies();
let Token;
export function getCookiesName(name) {
  return cookies.get("username");
}
export function setCookiesName(name) {
  return cookies.set("username", name);
}
export const getJwt=()=>{
  return  cookies.get('sessionToken');
}
export const setSession=(token)=>{
  return cookies.set("sessionToken", token);
}

export let AuthRequest = { login: "", password: "" };
export let SignUpRequest = { login: "", password: "", email: "" };
export let TopicRequest={login:"", topicName:""};
export let EmailChanges={password:""};

