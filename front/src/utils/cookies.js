import Cookies from 'universal-cookie';

export const cookies = new Cookies();

const options = { path: '/' };

export function getUsernameFromCookies() {
  return cookies.get('username');
}
export function setCookiesName(name) {
  return cookies.set('username', name, options);
}
export function removeCookie(name) {
  return cookies.remove(name, options);
}
export const getJwt = () => {
  return cookies.get('sessionToken');
};
export const setSession = token => {
  return cookies.set('sessionToken', token, options);
};

export let AuthRequest = { login: '', password: '' };
export let TopicRequest = { login: '', topicName: '' };
export let EmailChanges = { email: '' };
export let restorePasswordInfo = { email: '', password: '', key: '' };
