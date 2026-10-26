// const API_URL = "https://interviewprep-ai-77at.onrender.com"; // change to your Render URL after deploying

// document.addEventListener("DOMContentLoaded", () => {
//   const heroBoxes = document.getElementById("heroBoxes");
//   const authForms = document.getElementById("authForms");
//   const getStartedBtn = document.getElementById("getStartedBtn");
//   const getStartedBtn1 = document.getElementById("getStartedBtn1");
//   const homeLink = document.getElementById("homeLink");
//   const backBtn = document.getElementById("backBtn");

//   const loginTab = document.getElementById("loginTab");
//   const registerTab = document.getElementById("registerTab");
//   const loginForm = document.getElementById("loginForm");
//   const registerForm = document.getElementById("registerForm");

//   // "Get started" hides the left side and shows the login/register forms
//   getStartedBtn.addEventListener("click", () => {
//     heroBoxes.classList.add("hidden");
//     authForms.classList.remove("hidden");
//   });
//   getStartedBtn1.addEventListener("click", () => {
//     heroBoxes.classList.add("hidden");
//     authForms.classList.remove("hidden");
//   });

//   // back button returns to the home page
//   backBtn.addEventListener("click", () => {
//     authForms.classList.add("hidden");
//     heroBoxes.classList.remove("hidden");
//   });

//   homeLink.addEventListener("click", (e) => {
//     e.preventDefault();
//     authForms.classList.add("hidden");
//     heroBoxes.classList.remove("hidden");
//   });

//   // toggling between login and register
//   loginTab.addEventListener("click", () => {
//     loginTab.classList.add("active");
//     registerTab.classList.remove("active");
//     loginForm.classList.add("active");
//     registerForm.classList.remove("active");
//   });

//   registerTab.addEventListener("click", () => {
//     registerTab.classList.add("active");
//     loginTab.classList.remove("active");
//     registerForm.classList.add("active");
//     loginForm.classList.remove("active");
//   });
// });

// // registers the user
// async function register() {
//   let name = document.getElementById("name").value
//   let email = document.getElementById("email").value
//   let password = document.getElementById("password").value

//   let res = await fetch(API_URL + "/register", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify({ name, email, password })
//   });
//   let data1 = await res.json()

//   if (data1.status == "done") {
//     alert("registerd")
//   } else if (data1.status == "exists") {
//     alert("This email is already registered. Please login.")
//   } else {
//     alert("Registration failed, please fill all fields and try again")
//     return
//   }

//   // switch to the login tab
//   document.getElementById("loginTab").classList.add("active")
//   document.getElementById("registerTab").classList.remove("active")
//   document.getElementById("loginForm").classList.add("active")
//   document.getElementById("registerForm").classList.remove("active")
// }

// async function login() {
//   let Lemail = document.getElementById("Lemail").value;
//   let Lpassword = document.getElementById("Lpassword").value;

//   let res = await fetch(API_URL + "/login", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify({ Lemail, Lpassword })
//   })

//   let data = await res.json();
//   if (data.status == "logged") {
//     localStorage.setItem("token", data.token)
//     window.location.href = "dashboard.html"
//   } else {
//     alert("not logged")
//   }
// }


const API_URL = "https://interviewprep-ai-77at.onrender.com"; // change to your Render URL after deploying

document.addEventListener("DOMContentLoaded", () => {
  const heroBoxes = document.getElementById("heroBoxes");
  const authForms = document.getElementById("authForms");
  const getStartedBtn = document.getElementById("getStartedBtn");
  const getStartedBtn1 = document.getElementById("getStartedBtn1");
  const homeLink = document.getElementById("homeLink");
  const backBtn = document.getElementById("backBtn");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // "Get started" hides the left side and shows the login/register forms
  getStartedBtn.addEventListener("click", () => {
    heroBoxes.classList.add("hidden");
    authForms.classList.remove("hidden");
  });
  getStartedBtn1.addEventListener("click", () => {
    heroBoxes.classList.add("hidden");
    authForms.classList.remove("hidden");
  });

  // back button returns to the home page
  backBtn.addEventListener("click", () => {
    authForms.classList.add("hidden");
    heroBoxes.classList.remove("hidden");
  });

  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    authForms.classList.add("hidden");
    heroBoxes.classList.remove("hidden");
  });

  // toggling between login and register
  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  });
});

// registers the user
async function register() {
  let name = document.getElementById("name").value
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value

  let res = await fetch(API_URL + "/register", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  let data1 = await res.json()
  if (data1.status == "done") {
    alert("registerd")
  }
  else if (data1.status == "exists") {
    alert("This email is already registered. Please login.")
  }
  else {
    alert("Registration failed, please fill all fields and try again")
  }

  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
}

async function login() {
  let Lemail = document.getElementById("Lemail").value;
  let Lpassword = document.getElementById("Lpassword").value;

  let res = await fetch(API_URL + "/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ Lemail, Lpassword })
  })

  let data = await res.json();
  if (data.status == "logged") {
    localStorage.setItem("token", data.token)
    window.location.href = "dashboard.html"
  }
  else {
    alert("not logged")
  }
}