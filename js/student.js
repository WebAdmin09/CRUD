import { modal, addNewStudent, inputFirstname, inputLastname, inputNumber, inputurl, inputemail, inputbirthday, inputcheck, selectedInput, request, getStudents } from './main-student.js';
import { LIMIT } from './const-student.js';

export const cardWrapper = document.querySelector('.card__wrapper');
// const searchinput = document.querySelector('.search__input');
// const allperson = document.querySelector('.all__person');

export function createStudent(student) {
    const { id, firtsName: firstName, lastName, avatar, groups, isWork, phoneNumber, email, birthday } = student

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

    const studentfirstName = document.createElement('h2');
    studentfirstName.className = 'teacherName';
    studentfirstName.innerHTML = `${firstName}`

    const studentlastName = document.createElement('h2');
    studentlastName.className = 'teacherName';
    studentlastName.innerHTML = `${lastName}`

    const teacherEmail = document.createElement('h4');
    teacherEmail.className = 'teacherEmail';
    teacherEmail.innerHTML = `${email}`;

    const teacherBirthday = document.createElement('h4');
    teacherBirthday.className = 'teacherEmail';
    teacherBirthday.innerHTML = `Birthday:${new Date(birthday).toDateString()}`;

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

    const studentIsWork = document.createElement('span');
    studentIsWork.className = 'teacherMarried';
    studentIsWork.innerHTML = `IsWork: ${isWork}`;

    const cardBtn = document.createElement('div');
    cardBtn.className = 'card__btn'

    const studentBtn = document.createElement('button');
    studentBtn.className = 'teacher__btn';
    studentBtn.textContent = 'Teacher'

    studentBtn.addEventListener('click', () => {
        localStorage.setItem('teacherId', id)
        setTimeout(() => {
            window.location.href = './teacher.html'
        }, 0)
    })

    const studentEditBtn = document.createElement('button');
    studentEditBtn.className = 'teacher__btn';
    studentEditBtn.textContent = 'Edit'
    studentEditBtn.addEventListener('click', () => editStudent(student))

    const studentDeleteBtn = document.createElement('button');
    studentDeleteBtn.className = 'teacher__btn';
    studentDeleteBtn.setAttribute('id', id)
    studentDeleteBtn.innerHTML = 'Delete'
    studentDeleteBtn.addEventListener('click', () => deleteStudent(student))

    cardImgWrap.append(cardImg);
    cardBtn.append(studentBtn, studentEditBtn, studentDeleteBtn)
    fullName.append(studentfirstName, studentlastName)
    cardTextWrap.append(fullName, teacherEmail, teacherNumber, teacherNumber, studentIsWork, teacherBirthday, cardBtn);
    mainWrap.append(cardImg, cardTextWrap);
    return mainWrap;
};


function editStudent(data) {
    modal.setAttribute('id', 'edit')
    selectedInput.value = data.id
    modal.style.display = 'block'
    addNewStudent.textContent = 'Edit Student';
    inputFirstname.value = data.firtsName
    inputLastname.value = data.lastName;
    inputNumber.value = data.phoneNumber;
    inputurl.value = data.avatar
    inputemail.value = data.email
    inputbirthday.value = data.birthday;
    inputcheck.checked = data.isWork;
}
async function deleteStudent(data) {
    const studentId = data.id;
    let teacherId = localStorage.getItem('teacherId');
    await request.delete(`teacher/${teacherId}/student/${studentId}`);
    getStudents({ teacher_id: localStorage.getItem("teacherId") })
}

export const selectMarry = document.querySelector('.select__marry');

selectMarry.addEventListener('change', async (e) => {
    getStudents({ teacher_id: localStorage.getItem("teacherId") })
})


export const selectSort = document.querySelector('.select__sort');

selectSort.addEventListener('change', async (e) => {
    getStudents({ teacher_id: localStorage.getItem("studenId") })
})


