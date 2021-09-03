// import getHabits from "./requests";
// import API_URL from "./url";
const API_URL = window.location.hostname.includes('localhost')
	? 'http://localhost:3000'
	: 'https://habitual-lap2.herokuapp.com/';


function loginSubmit(event) {
  event.preventDefault();
  window.location.assign("dashboard.html");
}

function registerSubmit(event) {
  const passwordValue = document.getElementById("registerPasswordInput").value;
  const confirmPasswordValue = document.getElementById(
    "confirmPasswordInput"
    ).value;
    if (confirmPasswordValue === passwordValue && registerForm.checkValidity()) {
      window.location.assign("dashboard.html");
    } else if (confirmPasswordValue != passwordValue) {
      document.getElementById("confirmPasswordInput").setCustomValidity(true);
    }
    registerForm.classList.add("was-validated");
    event.stopPropagation();
  }
  
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", registerSubmit);
  
  async function requestRegistration(e) {
    e.preventDefault();
    try {
      let formData = new FormData(e.target);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      };
      const r = await fetch(`${API_URL}/auth/register`, options);
      const data = await r.json();
      if (data.err) {
        throw Error(data.err);
      }
      requestLogin(e);
    } catch (err) {
      console.warn(err);
    }
  }
  
  async function requestLogin(e) {
    e.preventDefault();
    const username = document.getElementById("emailInput").value
    const password = document.getElementById("passwordInput").value
    console.log(e.target);
    try {
      //let formData = new FormData(e.target);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"
                 },
        body: JSON.stringify({
          username, password
        })
      };
      
      const r = await fetch(`${API_URL}/auth/login`, options);
      const data = await r.json();
      if (!data.success) {
        throw new Error("Login not authorised");
      }
      login(data.token, data.username);
    } catch (err) {
      console.warn(err);
    }
  }
  
  function login(token, username) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    window.location.assign("dashboard.html");
    //getHabits();
  }

// function logout() {
  //   localStorage.clear();
  //   location.reload();
  // }
  
function currentUser() {
    const username = localStorage.getItem("username");
    return username;
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", requestLogin);
  
  // module.exports = {
  //   registerSubmit,
  //   requestLogin,
  //   requestRegistration,
  //   logout,
  //   currentUser,
  //   login,
  // };
  

