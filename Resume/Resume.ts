const skill = document.querySelector('.skillfunc') as HTMLElement
const language = document.querySelector('.langfunc') as HTMLElement
const skillBtn = document.getElementById('skillTogle') as HTMLElement
const langBtn = document.getElementById('languageToggle') as HTMLElement
const arrow1 = document.getElementById('arrow1') as HTMLElement
const arrow2 = document.getElementById('arrow2') as HTMLElement

const params = new URLSearchParams(window.location.search);
const username = params.get('user');

skillBtn.onclick = () => {
   if( skill.style.display == 'none'){
    skill.style.display = 'block'
    arrow1.style.transform = 'rotate(180deg)';
   }
   else{
skill.style.display = 'none'
arrow1.style.transform = 'rotate(0deg)';

   }
}

langBtn.onclick = () => {
if(language.style.display == 'none'){
  language.style.display = 'block'
  arrow2.style.transform = 'rotate(180deg)';
}
else{
language.style.display = 'none'
arrow2.style.transform = 'rotate(0deg)';

}
}


const resumeData = JSON.parse(localStorage.getItem('resumeData') || '{}');


document.getElementById('displayName')!.textContent = resumeData.fullName;
document.getElementById('PCdisplayName')!.textContent = resumeData.fullName;
document.getElementById('displayJobTitle')!.textContent = resumeData.jobTitle;
document.getElementById('PCdisplayJobTitle')!.textContent = resumeData.jobTitle;

document.getElementById('displayEmail')!.textContent = resumeData.email;
document.getElementById('address')!.textContent = resumeData.address;
document.getElementById('phoneNum')!.textContent = resumeData.phone;
document.getElementById('profile')!.textContent = resumeData.profile;
document.getElementById('displayExperience')!.textContent = resumeData.experience;

console.log(resumeData.skills)
console.log(resumeData.education[0].university)
console.log(resumeData.languages)
console.log('Resume Data:', resumeData);



const skillsList = document.querySelectorAll('.skillfunc');
if (skillsList) {
    skillsList.forEach(languageList => {

        (languageList as HTMLElement).innerHTML = '';


        resumeData.skills.forEach((skill: string) => {
            const li = document.createElement('li');
            li.textContent = skill;
            (languageList as HTMLElement).appendChild(li);
        });
    });
}




const languageList = document.querySelectorAll('.langfunc') ;
if (languageList) {
    languageList.forEach(languageList => {

        (languageList as HTMLElement).innerHTML = '';


        resumeData.languages.forEach((skill: string) => {
            const li = document.createElement('li');
            li.textContent = skill;
            (languageList as HTMLElement).appendChild(li);
        });
    });
}





//education:

const educationContain = document.getElementsByClassName('educationContainer') as HTMLCollectionOf<HTMLElement>;


Array.from(educationContain).forEach((element) => {
    element.innerHTML = ''; 
});


resumeData.education.forEach((edu: { degree: string, university: string, year: string }) => {
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


//Edit functionality:
let isEditing = false;

const editBtn = document.getElementById('editBtn') as HTMLElement;

editBtn.onclick = () => {
  isEditing = !isEditing;

  if (isEditing) {

    document.getElementById('displayName')!.contentEditable = 'true';
    document.getElementById('displayJobTitle')!.contentEditable = 'true';
    document.getElementById('PCdisplayName')!.contentEditable = 'true';
    document.getElementById('PCdisplayJobTitle')!.contentEditable = 'true';
    document.getElementById('displayEmail')!.contentEditable = 'true';
    document.getElementById('address')!.contentEditable = 'true';
    document.getElementById('phoneNum')!.contentEditable = 'true';
    document.getElementById('profile')!.contentEditable = 'true';
    document.getElementById('displayExperience')!.contentEditable = 'true';
    document.querySelectorAll('.langfunc').forEach((element)=>{
        (element as HTMLElement).contentEditable = 'true';
    })
    document.querySelectorAll('.skillfunc').forEach((element)=>{
        (element as HTMLElement).contentEditable = 'true';
    });
    document.querySelectorAll('.educationContainer').forEach((element)=>{
        (element as HTMLElement).contentEditable = 'true';
    });

   ( document.getElementById('editBtn')as HTMLElement).textContent = 'save';

  } else {

    document.getElementById('displayName')!.contentEditable = 'false';
    document.getElementById('displayJobTitle')!.contentEditable = 'false';
    document.getElementById('PCdisplayName')!.contentEditable = 'false';
    document.getElementById('PCdisplayJobTitle')!.contentEditable = 'false';
    document.getElementById('displayEmail')!.contentEditable = 'false';
    document.getElementById('address')!.contentEditable = 'false';
    document.getElementById('phoneNum')!.contentEditable = 'false';
    document.getElementById('profile')!.contentEditable = 'false';
    document.getElementById('displayExperience')!.contentEditable = 'false';
    document.querySelectorAll('.langfunc').forEach((element)=>{
        (element as HTMLElement).contentEditable = 'false';
    })
    document.querySelectorAll('.skillfunc').forEach((element)=>{
        (element as HTMLElement).contentEditable = 'false';
    });
    document.querySelectorAll('.educationContainer').forEach((element)=>{
        (element as HTMLElement).contentEditable = 'false';
    });

    ( document.getElementById('editBtn')as HTMLElement).textContent = 'Edit';
  }
};

//pfp:
const profilePic = document.getElementById('profilePic') as HTMLImageElement;
if(profilePic){
    profilePic.src = resumeData.profilePicture
}

const prnBtn = document.getElementById('printBtn') as HTMLElement;
const editsBtn = document.getElementById('editBtn') as HTMLElement;
let printing = false;

prnBtn.onclick = () => {
  printing = true;

  if (printing) {
    prnBtn.style.display = 'none';
    editsBtn.style.display = 'none';
    print();
  }
};

// Listen for the `afterprint` event to restore buttons
function setupShareableLink() {
    const displayNameElement = document.getElementById('displayName') as HTMLElement;
    const username = displayNameElement.textContent?.trim() || '';
  
    if (username) {
        const baseUrl = window.location.origin; // E.g., https://www.example.com
        const shareableLink = `${baseUrl}/Resume/Resume.html?user=${encodeURIComponent(username)}`;
        
 console.log(shareableLink)
      const copyLinkBtn = document.getElementById('copyLinkBtn') as HTMLElement;
  
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
    } else {
      console.error('Username is empty or undefined');
    }
}
  
window.onload = setupShareableLink;
