// --- TAB SWITCHING (Skill / Project / Company) ---
const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".prep-section");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));
    tab.classList.add("active");
    sections[index].classList.add("active");
  });
});

// === ELEMENTS ===
const skillList = document.getElementById("skillList");
const skillContent = document.getElementById("skillContent");

// ✅ FETCH SKILLS FROM API
async function fetchSkills() {
    let token=localStorage.getItem("token")
  try {
    const res = await fetch("http://localhost:2000/skills",{  
          // Headers:{"auth":"bearer "+token}
          headers:{"auth":"bearer "+token}
    });
    if (!res.ok) throw new Error("Failed to load skills");
    const data= await res.json();
    const skills=data.skills


    if(data.status!="Ok"){
        alert("Login Again")
        // console.log("Login again")
        window.location.href="HomePage.html"
    }

    // const skills =["javascript","htmll","css"]
    // Clear old content
    skillList.innerHTML = "";

    if (!skills || skills.length === 0) {
      skillList.innerHTML = `<p>No skills found.</p>`;
      return;
    }

    // Create list items dynamically
    skills.forEach(skill => {
      const li = document.createElement("li");
      li.classList.add("skill-item");
      li.textContent = skill.name || skill; // handle string or object

      li.addEventListener("click", () => {
        document.querySelectorAll(".skill-item").forEach(el => el.classList.remove("active"));
        li.classList.add("active");
        fetchQuestions(li.textContent);
      });

      skillList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    skillList.innerHTML = `<p>Error loading skills.</p>`;
  }
}

// ✅ FETCH QUESTIONS FOR SELECTED SKILL
async function fetchQuestions(skillName) {
   let token=localStorage.getItem("token")
  try {
    skillContent.innerHTML = `<p>Loading questions for <b>${skillName}</b>...</p>`;

    const res = await fetch(`http://localhost:2000/questions?skill=${encodeURIComponent(skillName)}`,{
      headers:{"auth":"bearer "+token}
    });
    if (!res.ok) throw new Error("Failed to load questions");
    // if (!res.ok) throw new Error("Failed to load skills");

    const data1 = await res.json();

    if(data1.status!="Ok"){
        alert("Login Again")
        // console.log("Login again")
        window.location.href="HomePage.html"
        return;
    }

    console.log(data1)
    const data=data1.questions
//     const data =[
//   "What is JavaScript?",
//   "Explain closures in JavaScript.",
//   "What is event bubbling?"
// ]

    if (!data || data.length === 0) {
      skillContent.innerHTML = `<p>No questions found for ${skillName}.</p>`;
      return;
    }

    skillContent.innerHTML = `
      <h3>${skillName} Questions</h3>
      <ul style="list-style:none;">${data.map((q,i) => `<li class="question_list">Q.${i+1} ${q}</li>`).join("")}</ul>
    `;
  } catch (error) {
    console.error(error);
    skillContent.innerHTML = `<p>Error loading questions.</p>`;
  }
}

// === INITIAL LOAD ===
fetchSkills();


// === DYNAMIC PROJECTS (Static Example) ===
// You can later connect these to your backend if needed
const projects = [
  {
    name: "Exam Management App",
    questions: [
      "How does the login system work?",
      "Explain how you used SQLite database.",
      "How are roles (Student, Teacher, Admin) managed?"
    ]
  },
  {
    name: "Flappy Bird Game",
    questions: [
      "Which library did you use for rendering?",
      "How do you handle collisions?",
      "How is the score maintained?"
    ]
  },
  {
    name: "AgroBot V2",
    questions: [
      "Which sensors are used for soil moisture detection?",
      "How does the robot decide when to water crops?",
      "Explain how autonomous movement is achieved."
    ]
  }
];

const projectList = document.getElementById("projectList");
const projectContent = document.getElementById("projectContent");

projects.forEach((project) => {
  const li = document.createElement("li");
  li.classList.add("project-item");
  li.textContent = project.name;

  li.addEventListener("click", () => {
    document.querySelectorAll(".project-item").forEach(el => el.classList.remove("active"));
    li.classList.add("active");

    projectContent.innerHTML = `
      <h3>${project.name} Related Questions</h3>
      <ul>${project.questions.map(q => `<li>${q}</li>`).join("")}</ul>
    `;
  });

  projectList.appendChild(li);
});
