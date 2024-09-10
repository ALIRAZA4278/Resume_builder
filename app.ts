const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
const profilePictureInput = document.getElementById(
  "profilePicture"
) as HTMLInputElement;
const profilePicturePreview = document.getElementById(
  "profilePicturePreview"
) as HTMLImageElement;

type Education = {
  school: string;
  degree: string;
  field: string;
  years: string;
};

type WorkExperience = {
  company: string;
  jobTitle: string;
  years: string;
  description: string;
};

type Skill = {
  name: string;
  level: string;
};

let educations: Education[] = [];
let workExperiences: WorkExperience[] = [];
let skills: Skill[] = [];
let profilePictureURL: string | undefined = undefined;

const renderResume = () => {
  // Resume content for rendering (with edit/delete buttons)
  const renderedContent = `
    <style>
    
      .resume-container {
        width: 80%;
        margin: 20px auto;
        font-family: Arial, sans-serif;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
        background-color: #f9f9f9;
      }
      .resume-title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .section-title {
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      @media only screen and (max-width: 650px) {
         /* For mobile phones: */
        .resume-container {
            width: 90%; /* Adjust the width to fit better on mobile screens */
            padding: 15px; /* Adjust padding for smaller screens */
           font-size: 14px; /* Decrease font size slightly for readability on small screens */
        }

      .personal-info {
          display: block; /* Stack the elements vertically */
          text-align: center; /* Center align for a cleaner layout */
          margin: 0 auto; /* Center the personal info section */
        }

      .profile-picture {
          width: 80px; /* Make the profile picture smaller */
          height: 80px; /* Adjust the height to match the width */
          margin: 0 auto 10px; /* Center and add some margin below the image */
        }

      .section-title {
          font-size: 16px; /* Adjust font size for section titles */
          margin-top: 15px;
          margin-bottom: 8px;
        }

      .education-item, .skills-item, .work-experience-item {
          font-size: 14px; /* Adjust font size for list items */
  }
}

      .personal-info, .education-list, .skills-list, .work-experience-list {
        margin-left: 20px;
      }
      .profile-picture {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      .education-item, .skills-item, .work-experience-item {
        margin-bottom: 10px;
      }
      .edit-btn, .delete-btn {
        margin-left: 10px;
        padding: 3px 8px;
        font-size: 12px;
        cursor: pointer;
      }
      .edit-btn {
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
      }
      .delete-btn {
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 5px;
      }
    </style>

    <div class="resume-container">
      <h2 class="resume-title">Resume</h2>
      
      <h3 class="section-title">Personal Information</h3>
      <div class="personal-info">
        ${
          profilePictureURL
            ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture">`
            : ""
        }
        <p><strong>Name:</strong> ${
          (document.getElementById("name") as HTMLInputElement).value
        }</p>
        <p><strong>Email:</strong> ${
          (document.getElementById("email") as HTMLInputElement).value
        }</p>
        <p><strong>Phone:</strong> ${
          (document.getElementById("phone") as HTMLInputElement).value
        }</p>
      </div>

      <h3 class="section-title">Education</h3>
      <ul class="education-list">
        ${educations
          .map(
            (edu, index) => `
            <li class="education-item">
              ${edu.school} - ${edu.degree}, ${edu.field} (${edu.years})
              <button type="button" class="edit-btn" onclick="editEducation(${index})">Edit</button>
              <button type="button" class="delete-btn" onclick="deleteEducation(${index})">Delete</button>
            </li>
          `
          )
          .join("")}
      </ul>

      <h3 class="section-title">Skills</h3>
      <ul class="skills-list">
        ${skills
          .map(
            (skill, index) => `
            <li class="skills-item">
              ${skill.name} (${skill.level})
              <button type="button" class="delete-btn" onclick="deleteSkill(${index})">Delete</button>
            </li>
          `
          )
          .join("")}
      </ul>
      
      <h3 class="section-title">Work Experience</h3>
      <ul class="work-experience-list">
        ${workExperiences
          .map(
            (exp, index) => `
            <li class="work-experience-item">
              ${exp.company} - ${exp.jobTitle} (${exp.years})
              <br><span class="work-description">${exp.description}</span>
              <button type="button" class="edit-btn" onclick="editExperience(${index})">Edit</button>
              <button type="button" class="delete-btn" onclick="deleteExperience(${index})">Delete</button>
            </li>
          `
          )
          .join("")}
      </ul>
    </div>
  `;

  // Resume content for download (without edit/delete buttons)
  const downloadContent = `
    <style>
      /* Same styles as above */
      .resume-container {
        width: 80%;
        margin: 20px auto;
        font-family: Arial, sans-serif;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
        background-color: #f9f9f9;
      }
      .resume-title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .section-title {
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      .personal-info, .education-list, .skills-list, .work-experience-list {
        margin-left: 20px;
      }
      .profile-picture {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      .education-item, .skills-item, .work-experience-item {
        margin-bottom: 10px;
      }
        
.resume-output {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 200px;
  font-size: 16px;
  color: #555;
}

@media print {
  .container .header{
    display: none;
    }
  form {
    display: none;
  }

  .resume-output {
    font-size: 14px;
    color: #000;
  }

  body {
    background-color: white;
  }

  button {
    display: none;
  }
  #username{
    display: none;
  }
}

#profilePicturePreview {
  max-width: 150px;
  display: none;
}

.resume-output img {
  max-width: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
}

/*  */
/* Resume container */
.resume-container {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}

/* Title styling */
.resume-title {
  text-align: center;
  color: #007bff;
}

/* Section title styling */
.section-title {
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 15px;
  color: #333;
}

/* Personal info styling */
.personal-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-picture {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

/* List styling */
.education-list,
.skills-list,
.work-experience-list {
  list-style-type: none;
  padding: 0;
}

.education-item,
.skills-item,
.work-experience-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* Button styling */
.edit-btn,
.delete-btn {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.work-description {
  display: block;
  margin-top: 5px;
  font-style: italic;
}
    </style>

    <div class="resume-container">
      <h2 class="resume-title">Resume</h2>
      
      <h3 class="section-title">Personal Information</h3>
      <div class="personal-info">
        ${
          profilePictureURL
            ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture">`
            : ""
        }
        <p><strong>Name:</strong> ${
          (document.getElementById("name") as HTMLInputElement).value
        }</p>
        <p><strong>Email:</strong> ${
          (document.getElementById("email") as HTMLInputElement).value
        }</p>
        <p><strong>Phone:</strong> ${
          (document.getElementById("phone") as HTMLInputElement).value
        }</p>
      </div>

      <h3 class="section-title">Education</h3>
      <ul class="education-list">
        ${educations
          .map(
            (edu) => `
            <li class="education-item">
              ${edu.school} - ${edu.degree}, ${edu.field} (${edu.years})
            </li>
          `
          )
          .join("")}
      </ul>

      <h3 class="section-title">Skills</h3>
      <ul class="skills-list">
        ${skills
          .map(
            (skill) => `
            <li class="skills-item">
              ${skill.name} (${skill.level})
            </li>
          `
          )
          .join("")}
      </ul>
      
      <h3 class="section-title">Work Experience</h3>
      <ul class="work-experience-list">
        ${workExperiences
          .map(
            (exp) => `
            <li class="work-experience-item">
              ${exp.company} - ${exp.jobTitle} (${exp.years})
              <br><span class="work-description">${exp.description}</span>
            </li>
          `
          )
          .join("")}
      </ul>
    </div>
  `;

  // Render the resume on the page
  resumeOutput.innerHTML = renderedContent;

  // Add Download Link with Username for HTML file
  const usernameElement = document.getElementById(
    "username"
  ) as HTMLInputElement;
  if (usernameElement && usernameElement.value) {
    const username = usernameElement.value;
    const uniquePath = `${username.replace(/\s+/g, "-")}-resume.html`;

    const downloadLink = document.createElement("a");
    downloadLink.href =
      "data:text/html;charset=UTF-8," + encodeURIComponent(downloadContent);
    downloadLink.download = uniquePath;
    downloadLink.textContent = "Download your resume";

    // Clear previous link if any and append new one
    const existingLink = resumeOutput.querySelector("a[download]");
    if (existingLink) {
      resumeOutput.removeChild(existingLink);
    }

    resumeOutput.appendChild(downloadLink);
  }
};

// Adding print PDF functionality (kept as requested)
document.getElementById("printResume")?.addEventListener("click", () => {
  window.print();
});

// Event Listeners for Adding Sections
document.getElementById("add-education")?.addEventListener("click", (e) => {
  e.preventDefault();
  const school = (document.getElementById("school") as HTMLInputElement).value;
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const field = (document.getElementById("field") as HTMLInputElement).value;
  const years = (document.getElementById("years") as HTMLInputElement).value;

  if (school && degree && field && years) {
    educations.push({ school, degree, field, years });
    renderResume();
  }
});

document.getElementById("addExperience")?.addEventListener("click", (e) => {
  e.preventDefault();
  const company = (document.getElementById("company") as HTMLInputElement)
    .value;
  const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement)
    .value;
  const years = (document.getElementById("years") as HTMLInputElement).value;
  const description = (
    document.getElementById("jobDescription") as HTMLInputElement
  ).value;

  if (company && jobTitle && years && description) {
    workExperiences.push({ company, jobTitle, years, description });
    renderResume();
  }
});

document.getElementById("add-Skills")?.addEventListener("click", (e) => {
  e.preventDefault();
  const name = (document.getElementById("text") as HTMLInputElement).value;
  const level = (document.getElementById("option") as HTMLSelectElement).value;

  if (name && level) {
    skills.push({ name, level });
    renderResume();
  }
});

// Form Submit Handler
resumeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderResume();
});

// // Print Functionality
// document.getElementById("printResume")?.addEventListener("click", () => {
//   window.print();
// });

// Profile Picture Handler
profilePictureInput.addEventListener("change", (event) => {
  const file = profilePictureInput.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePictureURL = e.target?.result as string;
      profilePicturePreview.src = profilePictureURL;
      profilePicturePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Edit and Delete Functions (global scope for inline event handlers)
(window as any).editEducation = (index: number) => {
  const education = educations[index];
  (document.getElementById("school") as HTMLInputElement).value =
    education.school;
  (document.getElementById("degree") as HTMLInputElement).value =
    education.degree;
  (document.getElementById("field") as HTMLInputElement).value =
    education.field;
  (document.getElementById("years") as HTMLInputElement).value =
    education.years;

  educations.splice(index, 1);
  renderResume();
};

(window as any).deleteEducation = (index: number) => {
  educations.splice(index, 1);
  renderResume();
};

(window as any).editExperience = (index: number) => {
  const experience = workExperiences[index];
  (document.getElementById("company") as HTMLInputElement).value =
    experience.company;
  (document.getElementById("jobTitle") as HTMLInputElement).value =
    experience.jobTitle;
  (document.getElementById("years") as HTMLInputElement).value =
    experience.years;
  (document.getElementById("jobDescription") as HTMLInputElement).value =
    experience.description;

  workExperiences.splice(index, 1);
  renderResume();
};

(window as any).deleteExperience = (index: number) => {
  workExperiences.splice(index, 1);
  renderResume();
};

(window as any).deleteSkill = (index: number) => {
  skills.splice(index, 1);
  renderResume();
};
