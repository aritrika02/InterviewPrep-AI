

async function validate(){
    // console.log("hello bhai")
    let token=localStorage.getItem("token")
    let res=await fetch("http://localhost:2000/validate",{
        headers:{"auth":"bearer "+token}
    })
    let data=await res.json()
    
    if(data.status!="Ok"){
        alert("Login Again")
        console.log("Login again")
        window.location.href="HomePage.html"
    }
    console.log(data)
    // UsersName=data.user.name
    document.getElementById("UserName").innerHTML=data.user.name;

}
validate()


async function generate(){
    // console.log("data")
    document.getElementById("loading_btn").style.display="block"
    let token=localStorage.getItem("token")
    let file=document.getElementById("resume").files[0]
    let company=document.getElementById("company").value
    let role=document.getElementById("role").value
 
    if(!file || !company ||!role){
        alert("fill all fields")
        return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("company",company)
    formData.append("role",role)

    let res=await fetch("http://localhost:2000/generate",{
        method:"POST",
        headers:{"auth":"bearer "+token},
        body:formData
    })
    let data=await res.json()
    // console.log(data)
    // alert(data.status)
    if(data.status!="Ok"){
        alert("Login Again")
        // console.log("Login again")
        window.location.href="HomePage.html"
    }
    if(data.message!="sucess"){
        alert("server is busy try again")
    }
    else{
         document.getElementById("loading_btn").display="none"
        window.location.href="preparation.html"
    }
}
// console.log(UsersName)