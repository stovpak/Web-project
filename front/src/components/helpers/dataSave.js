let user;
let pass;
let email;
let data = {
  login: "",
  email: "",
  password: ""
};
export function setData(username, mail, password) {
  if (mail !== null) {
    console.log(username, password);
    return (
      (data.email = mail), (data.login = username), (data.password = password)
    );
  } else {
    return (user = username);
  }
}

export function getData() {
  console.log(user);
  /* return data[user, email, pass];*/
}

console.log(user);