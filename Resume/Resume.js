"use strict";
const skill = document.querySelector('.skillfunc');
const language = document.querySelector('.langfunc');
const skillBtn = document.getElementById('skillTogle');
const langBtn = document.getElementById('languageToggle');
const arrow1 = document.getElementById('arrow1');
const arrow2 = document.getElementById('arrow2');
const params = new URLSearchParams(window.location.search);
const username = params.get('user');
skillBtn.onclick = () => {
    if (skill.style.display == 'none') {
        skill.style.display = 'block';
        arrow1.style.transform = 'rotate(180deg)';
    }
    else {
        skill.style.display = 'none';
        arrow1.style.transform = 'rotate(0deg)';
    }
};
langBtn.onclick = () => {
    if (language.style.display == 'none') {
        language.style.display = 'block';
        arrow2.style.transform = 'rotate(180deg)';
    }
    else {
        language.style.display = 'none';
        arrow2.style.transform = 'rotate(0deg)';
    }
};
const resumeData = JSON.parse(localStorage.getItem('resumeData') || '{}');
document.getElementById('displayName').textContent = resumeData.fullName;
document.getElementById('PCdisplayName').textContent = resumeData.fullName;
document.getElementById('displayJobTitle').textContent = resumeData.jobTitle;
document.getElementById('PCdisplayJobTitle').textContent = resumeData.jobTitle;
document.getElementById('displayEmail').textContent = resumeData.email;
document.getElementById('address').textContent = resumeData.address;
document.getElementById('phoneNum').textContent = resumeData.phone;
document.getElementById('profile').textContent = resumeData.profile;
document.getElementById('displayExperience').textContent = resumeData.experience;
console.log(resumeData.skills);
console.log(resumeData.education[0].university);
console.log(resumeData.languages);
console.log('Resume Data:', resumeData);
const skillsList = document.querySelectorAll('.skillfunc');
if (skillsList) {
    skillsList.forEach(languageList => {
        languageList.innerHTML = '';
        resumeData.skills.forEach((skill) => {
            const li = document.createElement('li');
            li.textContent = skill;
            languageList.appendChild(li);
        });
    });
}
const languageList = document.querySelectorAll('.langfunc');
if (languageList) {
    languageList.forEach(languageList => {
        languageList.innerHTML = '';
        resumeData.languages.forEach((skill) => {
            const li = document.createElement('li');
            li.textContent = skill;
            languageList.appendChild(li);
        });
    });
}
const educationContain = document.getElementsByClassName('educationContainer');
Array.from(educationContain).forEach((element) => {
    element.innerHTML = '';
});
resumeData.education.forEach((edu) => {
    const eduElement = document.createElement('div');
    eduElement.innerHTML = `
        <h2><strong contentEditable= 'false'>Year:</strong> ${edu.year}</h2>
        <p><strong contentEditable= 'false'>Degree:</strong> ${edu.degree}</p>
        <p><strong contentEditable= 'false'>University:</strong> ${edu.university}</p>
    `;
    Array.from(educationContain).forEach((element) => {
        element.appendChild(eduElement.cloneNode(true));
    });
});
let isEditing = false;
const editBtn = document.getElementById('editBtn');
editBtn.onclick = () => {
    isEditing = !isEditing;
    if (isEditing) {
        document.getElementById('displayName').contentEditable = 'true';
        document.getElementById('displayJobTitle').contentEditable = 'true';
        document.getElementById('PCdisplayName').contentEditable = 'true';
        document.getElementById('PCdisplayJobTitle').contentEditable = 'true';
        document.getElementById('displayEmail').contentEditable = 'true';
        document.getElementById('address').contentEditable = 'true';
        document.getElementById('phoneNum').contentEditable = 'true';
        document.getElementById('profile').contentEditable = 'true';
        document.getElementById('displayExperience').contentEditable = 'true';
        document.querySelectorAll('.langfunc').forEach((element) => {
            element.contentEditable = 'true';
        });
        document.querySelectorAll('.skillfunc').forEach((element) => {
            element.contentEditable = 'true';
        });
        document.querySelectorAll('.educationContainer').forEach((element) => {
            element.contentEditable = 'true';
        });
        document.getElementById('editBtn').textContent = 'save';
    }
    else {
        document.getElementById('displayName').contentEditable = 'false';
        document.getElementById('displayJobTitle').contentEditable = 'false';
        document.getElementById('PCdisplayName').contentEditable = 'false';
        document.getElementById('PCdisplayJobTitle').contentEditable = 'false';
        document.getElementById('displayEmail').contentEditable = 'false';
        document.getElementById('address').contentEditable = 'false';
        document.getElementById('phoneNum').contentEditable = 'false';
        document.getElementById('profile').contentEditable = 'false';
        document.getElementById('displayExperience').contentEditable = 'false';
        document.querySelectorAll('.langfunc').forEach((element) => {
            element.contentEditable = 'false';
        });
        document.querySelectorAll('.skillfunc').forEach((element) => {
            element.contentEditable = 'false';
        });
        document.querySelectorAll('.educationContainer').forEach((element) => {
            element.contentEditable = 'false';
        });
        document.getElementById('editBtn').textContent = 'Edit';
    }
};
const profilePic = document.getElementById('profilePic');
if (profilePic) {
    profilePic.src = resumeData.profilePicture;
}
const prnBtn = document.getElementById('printBtn');
const editsBtn = document.getElementById('editBtn');
let printing = false;
prnBtn.onclick = () => {
    printing = true;
    if (printing) {
        prnBtn.style.display = 'none';
        editsBtn.style.display = 'none';
        print();
    }
};
function setupShareableLink() {
    var _a;
    const displayNameElement = document.getElementById('displayName');
    const username = ((_a = displayNameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    if (username) {
        const baseUrl = window.location.origin;
        const shareableLink = `${baseUrl}/Resume/Resume.html?user=${encodeURIComponent(username)}`;
        console.log(shareableLink);
        const copyLinkBtn = document.getElementById('copyLinkBtn');
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'text';
        hiddenInput.value = shareableLink;
        hiddenInput.style.position = 'absolute';
        hiddenInput.style.left = '-9999px';
        document.body.appendChild(hiddenInput);
        if (copyLinkBtn) {
            copyLinkBtn.onclick = () => {
                hiddenInput.select();
                document.execCommand('copy');
                alert('Link copied to clipboard!');
            };
        }
    }
    else {
        console.error('Username is empty or undefined');
    }
}
window.onload = setupShareableLink;
