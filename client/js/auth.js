// import jwt_decode from "jwt-decode";
// import getHabits from "./requests";
// import API_URL from "./url";
const API_URL = "http://localhost:3000"


function loginSubmit(event) {
  event.preventDefault();
  window.location.assign("dashboard.html");
}

function registerSubmit(event) {
  event.preventDefault();
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
  
  async function requestLogin(data) {
  //  e.preventDefault();
    
    try {
      //let formData = new FormData(e.target);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
      };
      
      const r = await fetch(`${API_URL}/auth/login`, options);
      const rJson = await r.json();
      if (!rJson.success) {
        throw new Error("Login not authorised");
      }
      login(rJson.token);
    } catch (err) {
      console.warn(err);
    }
  }
  
  function login(token) {
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    //localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.username);
    
    const landing = document.getElementById("landing");
    landing.className = "hide-page";
    const habit = document.getElementById("habit-page");
    habit.className = "";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.querySelector(".header-buttons").style.display = "none";
    
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
  