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



  //for displaying different contents we have a simple class named hidden and in that we have set property as display=none so the field which we have to hide we add the class to that field and the field  which we have to show we remove the hidden class from there
  
  // Show login/register  when click on get started ,left side hide and login and register button appears
  getStartedBtn.addEventListener("click", () => {
    heroBoxes.classList.add("hidden");
    authForms.classList.remove("hidden");
  });
  //doing the same thing this is just another get started button at the bottom of home page
  getStartedBtn1.addEventListener("click", () => {
    heroBoxes.classList.add("hidden");
    authForms.classList.remove("hidden");
  });

  // on clicking back button we come back to home page 
  backBtn.addEventListener("click", () => {
    authForms.classList.add("hidden");
    heroBoxes.classList.remove("hidden");
  });

  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    authForms.classList.add("hidden");
    heroBoxes.classList.remove("hidden");
  });

  // for toggeling between login and register we are doing same thing....we have active class with display=flex and we just assign active to that field which we have to show and we remove active from those fields which we want to hide
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



// this fucntion is for registering the user to our site
async function register(){

  //here we are getting the values of name email and password from ui
  let name=document.getElementById("name").value
  let email=document.getElementById("email").value
  let password=document.getElementById("password").value

  //using fetch  we are sending our name email and password to the backend /register route
  let res=await fetch("http://127.0.0.1:2000/register",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body: JSON.stringify({name,email,password})
  });
  let data1=await res.json()
  if(data1.status=="done"){
    alert("registerd")
  }

  loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");

  
}

async function login() {
  let Lemail=document.getElementById("Lemail").value;
  let Lpassword=document.getElementById("Lpassword").value;

  let res=await fetch("http://127.0.0.1:2000/login",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body: JSON.stringify({Lemail,Lpassword})
  })

  let data=await res.json();
  if(data.status=="logged"){
    console.log(data.token)
    // alert(data.token)
    localStorage.setItem("token",data.token)
    window.location.href="dashboard.html"
  }
  else{
    alert("not logged")

  }
}


