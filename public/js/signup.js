const signupBtn = document.querySelector(".signup-btn");

const signup = async function (name, email, password, confirmPassword) {
  try {
    console.log(name, email, password, confirmPassword);
    const res = await axios({
      method: "POST",
      url: "/api/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      },
    });
    if (res.data.status === "success") {
      alert("Logged in successfully");
      location.assign("/home");
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
signupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.querySelector(".name-input").value;
  const email = document.querySelector(".signup-email-input").value;
  const password = document.querySelector(".signup-password-input").value;
  const confirmPassword = document.querySelector(
    ".signup-confirm-password-input"
  ).value;
  signup(name, email, password, confirmPassword);
});
