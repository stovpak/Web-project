import { BehaviorSubject } from "rxjs";
import axios from "axios";
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationServise = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(username, password) {
  let data = JSON.stringify({ username, password });
  return axios
    .post("/", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(user => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    })
    .catch(error => console.log(error));
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}