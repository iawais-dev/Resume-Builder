"use strict";
const form = document.getElementById('resumeForm');
const skillButton = document.getElementById('addSkillBtn');
let skillDiv = document.getElementById('skillsContainer');
let removeButtonAdded = false;
skillButton.onclick = () => {
    const inp = document.createElement('input');
    inp.setAttribute('placeholder', 'Enter a skill');
    inp.setAttribute('name', 'skills[]');
    inp.classList.add('newInput');
    skillDiv.insertBefore(inp, skillButton);
    if (!removeButtonAdded) {
        const removeBtn = document.createElement('button');
        let input = skillDiv.getElementsByTagName('input');
        removeBtn.innerText = 'Remove Skill';
        removeBtn.type = 'button';
        skillDiv.append(removeBtn);
        removeBtn.onclick = () => {
            if (input.length > 1)
                skillDiv.removeChild(input[input.length - 1]);
        };
    }
    else {
        return null;
    }
    removeButtonAdded = true;
};
const LangBtn = document.getElementById('addLanguageBtn');
let LangDiv = document.getElementById('languagesContainer');
let removButtonAdded = false;
LangBtn.onclick = () => {
    const langinp = document.createElement('input');
    langinp.setAttribute('placeholder', 'Enter a language');
    langinp.setAttribute('name', 'lang[]');
    langinp.classList.add('newInput');
    LangDiv.insertBefore(langinp, LangBtn);
    console.log('Created Language Input:', langinp);
    if (!removButtonAdded) {
        const remvBtn = document.createElement('button');
        let input = LangDiv.getElementsByTagName('input');
        remvBtn.innerText = 'Remove Language';
        remvBtn.type = 'button';
        LangDiv.append(remvBtn);
        remvBtn.onclick = () => {
            if (input.length > 1)
                LangDiv.removeChild(input[input.length - 1]);
        };
    }
    else {
        return null;
    }
    removButtonAdded = true;
};
const addEducationButton = document.getElementById('addEducationBtn');
const educationContainer = document.getElementById('educationContainer');
addEducationButton.onclick = () => {
    const educationEntry = document.createElement('div');
    educationEntry.className = 'educationEntry';
    const degreeInput = document.createElement('input');
    degreeInput.placeholder = 'Degree/Major Name';
    degreeInput.name = 'educationDegree[]';
    const universityInput = document.createElement('input');
    universityInput.placeholder = 'University';
    universityInput.name = 'educationUniversity[]';
    const yearInput = document.createElement('input');
    yearInput.placeholder = 'Year (e.g., 2014 - 2016)';
    yearInput.name = 'educationYear[]';
    educationEntry.appendChild(degreeInput);
    educationEntry.appendChild(universityInput);
    educationEntry.appendChild(yearInput);
    educationContainer.insertBefore(educationEntry, addEducationButton);
};
const fileInput = document.getElementById('profilePicture');
const previewImg = document.getElementById('preview');
fileInput.addEventListener('change', () => {
    var _a;
    const file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        previewImg.src = imageUrl;
        previewImg.style.display = 'block';
        localStorage.setItem('profilePicture', imageUrl);
    }
    else {
        previewImg.style.display = 'none';
    }
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('adress').value;
    const email = document.getElementById('email').value;
    const profile = document.getElementById('profile').value;
    const experience = document.getElementById('experience').value;
    const skillInputs = Array.from(document.querySelectorAll('input[name="skills[]"]'));
    const skills = skillInputs.map(input => input.value);
    console.log('Skills:', skills);
    const languageInputs = Array.from(document.querySelectorAll('input[name="lang[]"]'));
    const languages = languageInputs.map(input => input.value);
    const degreeInputs = Array.from(document.querySelectorAll('input[name="educationDegree[]"]'));
    const universityInputs = Array.from(document.querySelectorAll('input[name="educationUniversity[]"]'));
    const yearInputs = Array.from(document.querySelectorAll('input[name="educationYear[]"]'));
    const degrees = degreeInputs.map(input => input.value);
    const universities = universityInputs.map(input => input.value);
    const years = yearInputs.map(input => input.value);
    let education = degrees.map((degree, index) => ({
        degree,
        university: universities[index],
        year: years[index]
    }));
    const profilePicture = localStorage.getItem('profilePicture');
    localStorage.setItem('resumeData', JSON.stringify({
        fullName,
        phone,
        address,
        email,
        jobTitle,
        skills,
        languages,
        profile,
        experience,
        education,
        profilePicture
    }));
    window.location.href = '../index.html';
});
