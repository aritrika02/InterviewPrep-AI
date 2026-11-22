
const API_URL = "http://localhost:5000";

// Validate user authentication
async function validate() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please log in first.");
        window.location.href = "HomePage.html";
        return;
    }

    try {
        const res = await fetch(API_URL + "/validate", {
            headers: {
                "auth": "bearer " + token
            }
        });

        const data = await res.json();

        if (!res.ok || data.status !== "Ok") {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "HomePage.html";
            return;
        }

        document.getElementById("UserName").textContent =
            data.user.name;

    } catch (error) {
        console.error("Validation error:", error);
        alert("Unable to connect to the backend server.");
    }
}

validate();

// Upload resume and generate preparation content
async function generate() {
    const loadingBtn = document.getElementById("loading_btn");
    const token = localStorage.getItem("token");

    const file = document.getElementById("resume").files[0];
    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();

    if (!file || !company || !role) {
        alert("Please fill in all fields and upload your resume.");
        return;
    }

    // Validate PDF
    if (
        file.type !== "application/pdf" ||
        !file.name.toLowerCase().endsWith(".pdf")
    ) {
        alert("Please upload a PDF file.");
        return;
    }

    // Maximum file size: 5 MB
    if (file.size > 5 * 1024 * 1024) {
        alert("Resume size must be less than 5 MB.");
        return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("company", company);
    formData.append("role", role);

    loadingBtn.style.display = "block";

    try {
        const res = await fetch(API_URL + "/generate", {
            method: "POST",
            headers: {
                "auth": "bearer " + token
            },
            body: formData
        });

        const data = await res.json();

        // Only redirect for authentication errors
        if (res.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "HomePage.html";
            return;
        }

        if (!res.ok || data.status !== "Ok") {
            alert(data.message || "Failed to process resume.");
            return;
        }

        // Navigate to preparation page
        window.location.href = "preparation.html";

    } catch (error) {
        console.error("Resume generation error:", error);
        alert("Cannot connect to server. Please try again.");

    } finally {
        loadingBtn.style.display = "none";
    }
}
