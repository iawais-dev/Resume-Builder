// Get references to the form and resume elements
const form = document.getElementById('resumeForm') as HTMLFormElement;

//skillAddBtn Functionality:

const skillButton = document.getElementById('addSkillBtn') as HTMLElement
let skillDiv = document.getElementById('skillsContainer') as HTMLElement
let removeButtonAdded = false;

skillButton.onclick = () => {
    const inp = document.createElement('input');
    inp.setAttribute('placeholder', 'Enter a skill')
    inp.setAttribute('name', 'skills[]');
    inp.classList.add('newInput')
    skillDiv.insertBefore(inp, skillButton)
    // localStorage.getItem('inp', skillDiv)

    if (!removeButtonAdded) {
        const removeBtn = document.createElement('button')
        let input = skillDiv.getElementsByTagName('input')

        removeBtn.innerText = 'Remove Skill'
        removeBtn.type = 'button'
        skillDiv.append(removeBtn)

        removeBtn.onclick = () => {
            if (input.length > 1)
                skillDiv.removeChild(input[input.length - 1])
        }

    } else {
        return null
    }
    removeButtonAdded = true
}

//language Functionallity :
const LangBtn = document.getElementById('addLanguageBtn') as HTMLElement
let LangDiv = document.getElementById('languagesContainer') as HTMLElement
let removButtonAdded = false;


LangBtn.onclick = () => {
    const langinp = document.createElement('input');
    langinp.setAttribute('placeholder', 'Enter a language')
    langinp.setAttribute('name', 'lang[]');
    langinp.classList.add('newInput')
    LangDiv.insertBefore(langinp, LangBtn)
    console.log('Created Language Input:', langinp);


    if (!removButtonAdded) {
        const remvBtn = document.createElement('button')
        let input = LangDiv.getElementsByTagName('input')

        remvBtn.innerText = 'Remove Language'
        remvBtn.type = 'button'
        LangDiv.append(remvBtn)

        remvBtn.onclick = () => {
            if (input.length > 1)
                LangDiv.removeChild(input[input.length - 1])
        }

    } else {
        return null
    }
    removButtonAdded = true
}

//education functionality:
const addEducationButton = document.getElementById('addEducationBtn') as HTMLElement;
const educationContainer = document.getElementById('educationContainer') as HTMLElement;

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

//pfp:
const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
const previewImg = document.getElementById('preview') as HTMLImageElement;

fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  if (file) {
    // Create a URL for the file
    const imageUrl  = URL.createObjectURL(file)
    previewImg.src = imageUrl;
    previewImg.style.display = 'block'; // Show the preview image

    localStorage.setItem('profilePicture', imageUrl);
  } else {
    previewImg.style.display = 'none'; // Hide if no file is selected
  }
});



form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Get form values
    const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
    const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('adress') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const profile = (document.getElementById('profile') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;



    const skillInputs = Array.from(document.querySelectorAll('input[name="skills[]"]')) as HTMLInputElement[];
    const skills = skillInputs.map(input => input.value);
    console.log('Skills:', skills);

    const languageInputs = Array.from(document.querySelectorAll('input[name="lang[]"]')) as HTMLInputElement[];
    const languages = languageInputs.map(input => input.value);

    const degreeInputs = Array.from(document.querySelectorAll('input[name="educationDegree[]"]')) as HTMLInputElement[];
    const universityInputs = Array.from(document.querySelectorAll('input[name="educationUniversity[]"]')) as HTMLInputElement[];
    const yearInputs = Array.from(document.querySelectorAll('input[name="educationYear[]"]')) as HTMLInputElement[];

    // Map over the input elements and get their values
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

    // Redirect to the resume page
    window.location.href = '../index.html';
});
