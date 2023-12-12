const loginBtn = document.querySelector(".login-btn");

const login = async function (email, password) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/users/login",
      data: {
        email: email,
        password: password,
      },
    });
    if (res.data.status === "success") {
      alert("Logged in successfully");
      location.assign("/home");
    }
    // console.log(res);
  } catch (err) {
    alert(err.response.data.message);
  }
};

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.querySelector(".email-input").value;
  const password = document.querySelector(".password-input").value;
  login(email, password);
});
