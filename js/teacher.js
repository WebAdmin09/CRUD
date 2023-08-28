import { modal, addNewTeacher, inputFirstname, inputLastname, inputNumber, inputurl, inputemail, inputcheck, selectedInput, request, getTeachers } from './main.js';

export const cardWrapper = document.querySelector('.card__wrapper');
export function createTeacher(teacher) {
    const { id, firstName, lastName, avatar, groups, isMarried, phoneNumber, email } = teacher

    const mainWrap = document.createElement('div');
    mainWrap.className = 'main__wrap';

    const cardImgWrap = document.createElement('div');
    cardImgWrap.className = 'cardImg__wrap';

    const cardTextWrap = document.createElement('div');
    cardTextWrap.className = 'cardText__wrap';

    const cardImg = document.createElement('img');
    cardImg.src = `${avatar}`;
    cardImg.className = 'card__img'

    const fullName = document.createElement('div');
    fullName.className = 'fullName'

    const teacherfirstName = document.createElement('h2');
    teacherfirstName.className = 'teacherName';
    teacherfirstName.innerHTML = `${firstName}`

    const teacherlastName = document.createElement('h2');
    teacherlastName.className = 'teacherName';
    teacherlastName.innerHTML = `${lastName}`

    const teacherEmail = document.createElement('h4');
    teacherEmail.className = 'teacherEmail';
    teacherEmail.innerHTML = `${email}`;

    const tacherGroup = document.createElement('span');
    tacherGroup.className = 'teacherGroup';
    tacherGroup.innerHTML = `${groups}`;

    const teacherNumber = document.createElement('h5');
    teacherNumber.className = 'teacherNumber';
    teacherNumber.innerHTML = `Phone: ${createregex(phoneNumber)}`;

    function createregex(phoneNumber) {
        let format = '(xxx) xx xx xx';
        for (let i = 0; i < phoneNumber.length; i++) {
            format = format.replace('x', phoneNumber[i]);
        }
        return format
    }

    const teacherMarry = document.createElement('span');
    teacherMarry.className = 'teacherMarry';
    teacherMarry.innerHTML = `IsMarried: ${isMarried}`;

    const cardBtn = document.createElement('div');
    cardBtn.className = 'card__btn'

    const tacherBtn = document.createElement('button');
    tacherBtn.className = 'teacher__btn';
    tacherBtn.textContent = 'Student'

    tacherBtn.addEventListener('click', () => {
        localStorage.setItem('teacherId', id)
        setTimeout(() => {
            window.location.href = './student.html'
        }, 0)
    })

    const tacherEditBtn = document.createElement('button');
    tacherEditBtn.className = 'teacher__btn';
    tacherEditBtn.textContent = 'Edit'
    tacherEditBtn.addEventListener('click', () => editteacher(teacher))

    const teacherDeleteBtn = document.createElement('button');
    teacherDeleteBtn.className = 'teacher__btn';
    teacherDeleteBtn.setAttribute('id', id)
    teacherDeleteBtn.innerHTML = 'Delete'
    teacherDeleteBtn.addEventListener('click', () => deleteteacher(teacher))

    cardImgWrap.append(cardImg);
    cardBtn.append(tacherBtn, tacherEditBtn, teacherDeleteBtn)
    fullName.append(teacherfirstName, teacherlastName)
    cardTextWrap.append(fullName, teacherEmail, teacherNumber, teacherNumber, teacherMarry, cardBtn);
    mainWrap.append(cardImg, cardTextWrap);
    return mainWrap;
};

function editteacher(data) {
    modal.setAttribute('id', 'edit')
    selectedInput.value = data.id
    modal.style.display = 'block'
    addNewTeacher.textContent = 'Edit Teacher';
    inputFirstname.value = data.firstName
    inputLastname.value = data.lastName;
    inputNumber.value = data.phoneNumber;
    inputurl.value = data.avatar
    inputemail.value = data.email
    inputcheck.checked = data.isMarried
}
async function deleteteacher(data) {
    const teacherId = data.id;
    await request.delete(`teacher/${teacherId}`);
    getTeachers()
}

export const selectMarry = document.querySelector('.select__marry');

selectMarry.addEventListener('change', async (e) => {
    getTeachers()
})


export const selectSort = document.querySelector('.select__sort');

selectSort.addEventListener('change', async (e) => {
    getTeachers()
})


