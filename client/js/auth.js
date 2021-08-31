function loginSubmit(event) {
  window.location.assign("dashboard.html");
  event.preventDefault();
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", loginSubmit);

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
