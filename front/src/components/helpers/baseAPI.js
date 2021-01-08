let baseUrl = "http://localhost:3000/";
let userApi = "http://localhost:3001/user/";
/*let topicsApi = "http://localhost:3001/topics/";*/

export function redirectToUrl(path) {
  return (window.location.href = baseUrl + path);
}

export function urlUserApi(path) {
  return userApi + path;
}


