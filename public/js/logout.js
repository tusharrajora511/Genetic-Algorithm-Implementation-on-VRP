const logoutBtn = document.querySelector(".logout-container-link");
// Implementing logout functionality
const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/users/logout",
    });
    // console.log(res);
    if (res.data.status === "success") {
      alert("You are now Logged out of your account");
      location.assign("/");
    }
  } catch (err) {
    // alert(err.response.data.message);
    console.log(err);
  }
};
if (logoutBtn != null) {
  logoutBtn.addEventListener("click", function () {
    // console.log();
    logout();
  });
}

const usernameSignin = document.querySelector(".user_name_img-conatiner");

if (usernameSignin) {
  usernameSignin.addEventListener("mouseover", function () {
    document.querySelector(".logout-container").classList.remove("hidden");
  });
  usernameSignin.addEventListener("mouseout", function () {
    document.querySelector(".logout-container").classList.add("hidden");
  });
}
