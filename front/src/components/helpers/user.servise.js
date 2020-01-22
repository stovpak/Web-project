import { authHeader } from "./auth-header";
import { handleResponse } from "./handleResponse";
import axios from 'axios';
export const userService = {
  getAll,
  getById
};
function getAll() {
  axios.get('/', {headers:authHeader()}).then(res => {
      handleResponse();
})
}
function getById(id) {
    axios.get('/users/${id}', {headers:authHeader()}).then(res => {
        handleResponse();
    })
}