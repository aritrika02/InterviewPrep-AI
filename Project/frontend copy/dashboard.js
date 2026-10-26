const API_URL = "https://interviewprep-ai-77at.onrender.com"; // change to your Render URL after deploying

async function validate() {
    let token = localStorage.getItem("token")
    let res = await fetch(API_URL + "/validate", {
        headers: { "auth": "bearer " + token }
    })
    let data = await res.json()

    if (data.status != "Ok") {
        alert("Login Again")
        window.location.href = "HomePage.html"
        return
    }
    document.getElementById("UserName").innerHTML = data.user.name
}
validate()

async function generate() {
    document.getElementById("loading_btn").style.display = "block"
    let token = localStorage.getItem("token")
    let file = document.getElementById("resume").files[0]
    let company = document.getElementById("company").value
    let role = document.getElementById("role").value

    if (!file || !company || !role) {
        alert("fill all fields")
        document.getElementById("loading_btn").style.display = "none"
        return
    }
    const formData = new FormData()
    formData.append("resume", file)
    formData.append("company", company)
    formData.append("role", role)

    let res = await fetch(API_URL + "/generate", {
        method: "POST",
        headers: { "auth": "bearer " + token },
        body: formData
    })
    let data = await res.json()

    if (data.status != "Ok") {
        alert("Login Again")
        window.location.href = "HomePage.html"
        return
    }
    if (data.message != "sucess") {
        document.getElementById("loading_btn").style.display = "none"
        alert("server is busy try again")
    } else {
        document.getElementById("loading_btn").style.display = "none"
        window.location.href = "preparation.html"
    }
}