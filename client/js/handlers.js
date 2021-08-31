const { requestLogin, requestRegistration, logout } = require('./auth')
const { postHabit } = require('./requests');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const habitForm = document.getElementById('habit-form');
const signOutButton = document.getElementById('sign-out')

loginForm.addEventListener('submit', requestLogin)

registerForm.addEventListener('submit', requestRegistration)

habitForm.addEventListener('submit', postHabit)

signOutButton.addEventListener('click', logout)