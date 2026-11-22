
const API_URL = "https://interviewprep-ai-77at.onrender.com";

// ================================
// AUTHENTICATION
// ================================

const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first.");
  window.location.href = "HomePage.html";
}

const authHeaders = {
  auth: "bearer " + token
};

// ================================
// TAB SWITCHING
// ================================

const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".prep-section");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    tab.classList.add("active");

    if (sections[index]) {
      sections[index].classList.add("active");
    }
  });
});

// ================================
// COMMON API HELPER
// ================================

async function getJson(path) {
  if (!token) {
    throw new Error("Please log in first.");
  }

  const response = await fetch(API_URL + path, {
    method: "GET",
    headers: authHeaders
  });

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error("Invalid server response.");
  }

  if (response.status === 401) {
    localStorage.removeItem("token");
    alert("Your session has expired. Please login again.");
    window.location.href = "HomePage.html";
    throw new Error("Session expired");
  }

  if (!response.ok || data.status !== "Ok") {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// ================================
// DISPLAY MESSAGE SAFELY
// ================================

function setMessage(element, message) {
  if (!element) return;

  element.replaceChildren();

  const p = document.createElement("p");
  p.textContent = message;

  element.appendChild(p);
}

// ================================
// DISPLAY GENERATED QUESTIONS
// ================================

function renderQuestions(element, title, questions) {
  if (!element) return;

  element.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = title;

  element.appendChild(heading);

  if (!Array.isArray(questions) || questions.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No questions available.";
    element.appendChild(p);
    return;
  }

  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.padding = "0";

  questions.forEach((item, index) => {
    const li = document.createElement("li");

    li.className = "question_list";

    const question =
      typeof item === "string"
        ? item
        : item.question || "Question unavailable";

    li.textContent = `Q.${index + 1} ${question}`;

    list.appendChild(li);
  });

  element.appendChild(list);
}

// ================================
// FETCH TECHNICAL SKILLS
// ================================

async function fetchSkills() {
  const skillList = document.getElementById("skillList");
  const companyList = document.getElementById("companySkillList");

  if (!skillList || !companyList) {
    console.error("Required skill containers are missing.");
    return;
  }

  setMessage(skillList, "Loading technical skills...");
  setMessage(companyList, "Loading company preparation skills...");

  try {
    const data = await getJson("/skills");

    const skills = Array.isArray(data.skills)
      ? data.skills
      : [];

    skillList.replaceChildren();
    companyList.replaceChildren();

    if (skills.length === 0) {
      setMessage(
        skillList,
        "No skills found. Please upload your resume first."
      );

      setMessage(
        companyList,
        "No technical skills available."
      );

      return;
    }

    skills.forEach(skill => {
      // -------------------------
      // SKILL-BASED PREPARATION
      // -------------------------

      const li = document.createElement("li");

      li.className = "skill-item";
      li.textContent = skill;

      li.addEventListener("click", () => {
        skillList.querySelectorAll("li").forEach(item => {
          item.classList.remove("active");
        });

        li.classList.add("active");

        fetchQuestions(
          skill,
          "skill",
          document.getElementById("skillContent")
        );
      });

      skillList.appendChild(li);

      // -------------------------
      // COMPANY-SPECIFIC PREPARATION
      // -------------------------

      const button = document.createElement("button");

      button.type = "button";
      button.className = "company-skill-btn";
      button.textContent = skill;

      button.addEventListener("click", () => {
        companyList.querySelectorAll("button").forEach(item => {
          item.classList.remove("active");
        });

        button.classList.add("active");

        fetchQuestions(
          skill,
          "company",
          document.getElementById("companyContent")
        );
      });

      companyList.appendChild(button);
    });

  } catch (error) {
    console.error("Skill loading error:", error);

    setMessage(skillList, error.message);
    setMessage(companyList, error.message);
  }
}

// ================================
// FETCH SKILL / COMPANY QUESTIONS
// ================================

async function fetchQuestions(skill, mode, target) {
  if (!target) return;

  setMessage(target, "Generating interview questions...");

  try {
    const url =
      `/questions?skill=${encodeURIComponent(skill)}` +
      `&mode=${encodeURIComponent(mode)}`;

    const data = await getJson(url);

    const title =
      mode === "company"
        ? `${skill} - Company-Specific Interview Questions`
        : `${skill} - Technical Interview Questions`;

    renderQuestions(
      target,
      title,
      data.questions
    );

  } catch (error) {
    console.error("Question generation error:", error);
    setMessage(target, error.message);
  }
}

// ================================
// FETCH RESUME PROJECTS
// ================================

async function fetchProjects() {
  const projectList = document.getElementById("projectList");
  const projectContent = document.getElementById("projectContent");

  if (!projectList || !projectContent) {
    console.error("Required project containers are missing.");
    return;
  }

  setMessage(projectList, "Loading your projects...");

  try {
    const data = await getJson("/projects");

    projectList.replaceChildren();

    const projects = Array.isArray(data.projects)
      ? data.projects
      : [];

    if (projects.length === 0) {
      setMessage(
        projectList,
        "No projects found. Please upload your resume again."
      );

      setMessage(
        projectContent,
        "Your resume projects will appear here."
      );

      return;
    }

    projects.forEach((project, index) => {
      const li = document.createElement("li");

      li.className = "project-item";
      li.textContent = project.name;

      li.addEventListener("click", async () => {
        projectList.querySelectorAll("li").forEach(item => {
          item.classList.remove("active");
        });

        li.classList.add("active");

        setMessage(
          projectContent,
          "Generating project-specific questions..."
        );

        try {
          const result = await getJson(
            `/project-questions?index=${index}`
          );

          renderQuestions(
            projectContent,
            `${project.name} - Project Interview Questions`,
            result.questions
          );

        } catch (error) {
          console.error(
            "Project question generation error:",
            error
          );

          setMessage(
            projectContent,
            error.message
          );
        }
      });

      projectList.appendChild(li);
    });

  } catch (error) {
    console.error("Project loading error:", error);

    setMessage(
      projectList,
      error.message
    );
  }
}

// ================================
// INITIALIZE APPLICATION
// ================================

if (token) {
  fetchSkills();
  fetchProjects();
}
