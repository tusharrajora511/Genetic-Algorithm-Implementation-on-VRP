const signUpBtn = document.querySelector(".sign-up-btn");
const signInBtn = document.querySelector(".sign-in-btn");
const signupContainer = document.querySelector(".signup-container");
const loginContainer = document.querySelector(".login-container");

signUpBtn.addEventListener("click", function () {
  loginContainer.classList.add("hidden");
  signupContainer.classList.remove("hidden");
});
signInBtn.addEventListener("click", function () {
  loginContainer.classList.remove("hidden");
  signupContainer.classList.add("hidden");
});
