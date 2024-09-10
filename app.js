var _a, _b, _c, _d;
var resumeForm = document.getElementById("resumeForm");
var resumeOutput = document.getElementById("resumeOutput");
var profilePictureInput = document.getElementById("profilePicture");
var profilePicturePreview = document.getElementById("profilePicturePreview");
var educations = [];
var workExperiences = [];
var skills = [];
var profilePictureURL = undefined;
var renderResume = function () {
    // Resume content for rendering (with edit/delete buttons)
    var renderedContent = "\n    <style>\n    \n      .resume-container {\n        width: 80%;\n        margin: 20px auto;\n        font-family: Arial, sans-serif;\n        border: 1px solid #ccc;\n        padding: 20px;\n        border-radius: 10px;\n        background-color: #f9f9f9;\n      }\n      .resume-title {\n        text-align: center;\n        font-size: 24px;\n        font-weight: bold;\n      }\n      .section-title {\n        font-size: 18px;\n        margin-top: 20px;\n        margin-bottom: 10px;\n      }\n\n      @media only screen and (max-width: 650px) {\n         /* For mobile phones: */\n        .resume-container {\n            width: 90%; /* Adjust the width to fit better on mobile screens */\n            padding: 15px; /* Adjust padding for smaller screens */\n           font-size: 14px; /* Decrease font size slightly for readability on small screens */\n        }\n\n      .personal-info {\n          display: block; /* Stack the elements vertically */\n          text-align: center; /* Center align for a cleaner layout */\n          margin: 0 auto; /* Center the personal info section */\n        }\n\n      .profile-picture {\n          width: 80px; /* Make the profile picture smaller */\n          height: 80px; /* Adjust the height to match the width */\n          margin: 0 auto 10px; /* Center and add some margin below the image */\n        }\n\n      .section-title {\n          font-size: 16px; /* Adjust font size for section titles */\n          margin-top: 15px;\n          margin-bottom: 8px;\n        }\n\n      .education-item, .skills-item, .work-experience-item {\n          font-size: 14px; /* Adjust font size for list items */\n  }\n}\n\n      .personal-info, .education-list, .skills-list, .work-experience-list {\n        margin-left: 20px;\n      }\n      .profile-picture {\n        width: 100px;\n        height: 100px;\n        border-radius: 50%;\n        margin-bottom: 10px;\n      }\n      .education-item, .skills-item, .work-experience-item {\n        margin-bottom: 10px;\n      }\n      .edit-btn, .delete-btn {\n        margin-left: 10px;\n        padding: 3px 8px;\n        font-size: 12px;\n        cursor: pointer;\n      }\n      .edit-btn {\n        background-color: #4CAF50;\n        color: white;\n        border: none;\n        border-radius: 5px;\n      }\n      .delete-btn {\n        background-color: #f44336;\n        color: white;\n        border: none;\n        border-radius: 5px;\n      }\n    </style>\n\n    <div class=\"resume-container\">\n      <h2 class=\"resume-title\">Resume</h2>\n      \n      <h3 class=\"section-title\">Personal Information</h3>\n      <div class=\"personal-info\">\n        ".concat(profilePictureURL
        ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profile-picture\">")
        : "", "\n        <p><strong>Name:</strong> ").concat(document.getElementById("name").value, "</p>\n        <p><strong>Email:</strong> ").concat(document.getElementById("email").value, "</p>\n        <p><strong>Phone:</strong> ").concat(document.getElementById("phone").value, "</p>\n      </div>\n\n      <h3 class=\"section-title\">Education</h3>\n      <ul class=\"education-list\">\n        ").concat(educations
        .map(function (edu, index) { return "\n            <li class=\"education-item\">\n              ".concat(edu.school, " - ").concat(edu.degree, ", ").concat(edu.field, " (").concat(edu.years, ")\n              <button type=\"button\" class=\"edit-btn\" onclick=\"editEducation(").concat(index, ")\">Edit</button>\n              <button type=\"button\" class=\"delete-btn\" onclick=\"deleteEducation(").concat(index, ")\">Delete</button>\n            </li>\n          "); })
        .join(""), "\n      </ul>\n\n      <h3 class=\"section-title\">Skills</h3>\n      <ul class=\"skills-list\">\n        ").concat(skills
        .map(function (skill, index) { return "\n            <li class=\"skills-item\">\n              ".concat(skill.name, " (").concat(skill.level, ")\n              <button type=\"button\" class=\"delete-btn\" onclick=\"deleteSkill(").concat(index, ")\">Delete</button>\n            </li>\n          "); })
        .join(""), "\n      </ul>\n      \n      <h3 class=\"section-title\">Work Experience</h3>\n      <ul class=\"work-experience-list\">\n        ").concat(workExperiences
        .map(function (exp, index) { return "\n            <li class=\"work-experience-item\">\n              ".concat(exp.company, " - ").concat(exp.jobTitle, " (").concat(exp.years, ")\n              <br><span class=\"work-description\">").concat(exp.description, "</span>\n              <button type=\"button\" class=\"edit-btn\" onclick=\"editExperience(").concat(index, ")\">Edit</button>\n              <button type=\"button\" class=\"delete-btn\" onclick=\"deleteExperience(").concat(index, ")\">Delete</button>\n            </li>\n          "); })
        .join(""), "\n      </ul>\n    </div>\n  ");
    // Resume content for download (without edit/delete buttons)
    var downloadContent = "\n    <style>\n      /* Same styles as above */\n      .resume-container {\n        width: 80%;\n        margin: 20px auto;\n        font-family: Arial, sans-serif;\n        border: 1px solid #ccc;\n        padding: 20px;\n        border-radius: 10px;\n        background-color: #f9f9f9;\n      }\n      .resume-title {\n        text-align: center;\n        font-size: 24px;\n        font-weight: bold;\n      }\n      .section-title {\n        font-size: 18px;\n        margin-top: 20px;\n        margin-bottom: 10px;\n      }\n      .personal-info, .education-list, .skills-list, .work-experience-list {\n        margin-left: 20px;\n      }\n      .profile-picture {\n        width: 100px;\n        height: 100px;\n        border-radius: 50%;\n        margin-bottom: 10px;\n      }\n      .education-item, .skills-item, .work-experience-item {\n        margin-bottom: 10px;\n      }\n        \n.resume-output {\n  background-color: #f9f9f9;\n  padding: 20px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  min-height: 200px;\n  font-size: 16px;\n  color: #555;\n}\n\n@media print {\n  .container .header{\n    display: none;\n    }\n  form {\n    display: none;\n  }\n\n  .resume-output {\n    font-size: 14px;\n    color: #000;\n  }\n\n  body {\n    background-color: white;\n  }\n\n  button {\n    display: none;\n  }\n  #username{\n    display: none;\n  }\n}\n\n#profilePicturePreview {\n  max-width: 150px;\n  display: none;\n}\n\n.resume-output img {\n  max-width: 150px;\n  border-radius: 50%;\n  margin-bottom: 15px;\n}\n\n/*  */\n/* Resume container */\n.resume-container {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n  color: #333;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n  background: #f9f9f9;\n  border-radius: 10px;\n}\n\n/* Title styling */\n.resume-title {\n  text-align: center;\n  color: #007bff;\n}\n\n/* Section title styling */\n.section-title {\n  border-bottom: 2px solid #007bff;\n  padding-bottom: 5px;\n  margin-bottom: 15px;\n  color: #333;\n}\n\n/* Personal info styling */\n.personal-info {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\n.profile-picture {\n  border-radius: 50%;\n  width: 150px;\n  height: 150px;\n  object-fit: cover;\n}\n\n/* List styling */\n.education-list,\n.skills-list,\n.work-experience-list {\n  list-style-type: none;\n  padding: 0;\n}\n\n.education-item,\n.skills-item,\n.work-experience-item {\n  padding: 10px;\n  border-bottom: 1px solid #ddd;\n}\n\n/* Button styling */\n.edit-btn,\n.delete-btn {\n  background-color: #007bff;\n  border: none;\n  color: white;\n  padding: 5px 10px;\n  margin-left: 10px;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.3s;\n}\n\n.work-description {\n  display: block;\n  margin-top: 5px;\n  font-style: italic;\n}\n    </style>\n\n    <div class=\"resume-container\">\n      <h2 class=\"resume-title\">Resume</h2>\n      \n      <h3 class=\"section-title\">Personal Information</h3>\n      <div class=\"personal-info\">\n        ".concat(profilePictureURL
        ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profile-picture\">")
        : "", "\n        <p><strong>Name:</strong> ").concat(document.getElementById("name").value, "</p>\n        <p><strong>Email:</strong> ").concat(document.getElementById("email").value, "</p>\n        <p><strong>Phone:</strong> ").concat(document.getElementById("phone").value, "</p>\n      </div>\n\n      <h3 class=\"section-title\">Education</h3>\n      <ul class=\"education-list\">\n        ").concat(educations
        .map(function (edu) { return "\n            <li class=\"education-item\">\n              ".concat(edu.school, " - ").concat(edu.degree, ", ").concat(edu.field, " (").concat(edu.years, ")\n            </li>\n          "); })
        .join(""), "\n      </ul>\n\n      <h3 class=\"section-title\">Skills</h3>\n      <ul class=\"skills-list\">\n        ").concat(skills
        .map(function (skill) { return "\n            <li class=\"skills-item\">\n              ".concat(skill.name, " (").concat(skill.level, ")\n            </li>\n          "); })
        .join(""), "\n      </ul>\n      \n      <h3 class=\"section-title\">Work Experience</h3>\n      <ul class=\"work-experience-list\">\n        ").concat(workExperiences
        .map(function (exp) { return "\n            <li class=\"work-experience-item\">\n              ".concat(exp.company, " - ").concat(exp.jobTitle, " (").concat(exp.years, ")\n              <br><span class=\"work-description\">").concat(exp.description, "</span>\n            </li>\n          "); })
        .join(""), "\n      </ul>\n    </div>\n  ");
    // Render the resume on the page
    resumeOutput.innerHTML = renderedContent;
    // Add Download Link with Username for HTML file
    var usernameElement = document.getElementById("username");
    if (usernameElement && usernameElement.value) {
        var username = usernameElement.value;
        var uniquePath = "".concat(username.replace(/\s+/g, "-"), "-resume.html");
        var downloadLink = document.createElement("a");
        downloadLink.href =
            "data:text/html;charset=UTF-8," + encodeURIComponent(downloadContent);
        downloadLink.download = uniquePath;
        downloadLink.textContent = "Download your resume";
        // Clear previous link if any and append new one
        var existingLink = resumeOutput.querySelector("a[download]");
        if (existingLink) {
            resumeOutput.removeChild(existingLink);
        }
        resumeOutput.appendChild(downloadLink);
    }
};
// Adding print PDF functionality (kept as requested)
(_a = document.getElementById("printResume")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    window.print();
});
// Event Listeners for Adding Sections
(_b = document.getElementById("add-education")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
    e.preventDefault();
    var school = document.getElementById("school").value;
    var degree = document.getElementById("degree").value;
    var field = document.getElementById("field").value;
    var years = document.getElementById("years").value;
    if (school && degree && field && years) {
        educations.push({ school: school, degree: degree, field: field, years: years });
        renderResume();
    }
});
(_c = document.getElementById("addExperience")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (e) {
    e.preventDefault();
    var company = document.getElementById("company")
        .value;
    var jobTitle = document.getElementById("jobTitle")
        .value;
    var years = document.getElementById("years").value;
    var description = document.getElementById("jobDescription").value;
    if (company && jobTitle && years && description) {
        workExperiences.push({ company: company, jobTitle: jobTitle, years: years, description: description });
        renderResume();
    }
});
(_d = document.getElementById("add-Skills")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function (e) {
    e.preventDefault();
    var name = document.getElementById("text").value;
    var level = document.getElementById("option").value;
    if (name && level) {
        skills.push({ name: name, level: level });
        renderResume();
    }
});
// Form Submit Handler
resumeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    renderResume();
});
// // Print Functionality
// document.getElementById("printResume")?.addEventListener("click", () => {
//   window.print();
// });
// Profile Picture Handler
profilePictureInput.addEventListener("change", function (event) {
    var _a;
    var file = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePictureURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            profilePicturePreview.src = profilePictureURL;
            profilePicturePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});
// Edit and Delete Functions (global scope for inline event handlers)
window.editEducation = function (index) {
    var education = educations[index];
    document.getElementById("school").value =
        education.school;
    document.getElementById("degree").value =
        education.degree;
    document.getElementById("field").value =
        education.field;
    document.getElementById("years").value =
        education.years;
    educations.splice(index, 1);
    renderResume();
};
window.deleteEducation = function (index) {
    educations.splice(index, 1);
    renderResume();
};
window.editExperience = function (index) {
    var experience = workExperiences[index];
    document.getElementById("company").value =
        experience.company;
    document.getElementById("jobTitle").value =
        experience.jobTitle;
    document.getElementById("years").value =
        experience.years;
    document.getElementById("jobDescription").value =
        experience.description;
    workExperiences.splice(index, 1);
    renderResume();
};
window.deleteExperience = function (index) {
    workExperiences.splice(index, 1);
    renderResume();
};
window.deleteSkill = function (index) {
    skills.splice(index, 1);
    renderResume();
};
