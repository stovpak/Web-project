import axios from "axios";

export const getData = async (url, token) => {
  const res = await axios
    .get(url, {
      Token: token
    })
    .then({})
    .catch({})
};
export const postData = async (url, data, token) => {
  return axios.post(url, data);
};
