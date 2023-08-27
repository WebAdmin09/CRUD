import { ENDPOINT } from './const-student.js';
import { cardWrapper, createStudent, selectMarry, selectSort } from './student.js';
let teacherIdcha = localStorage.getItem('teacherId');
const request = axios.create({
    baseURL: ENDPOINT,
    timeout: 10000,
});


const addBtn = document.querySelector('.add__btn');
const closeBtn = document.querySelector('.xmark__btn');
const closeBtn2 = document.querySelector('.xmark__btn2');
const modal = document.querySelector('.modal');
const inputForm = document.querySelector('.input__form')
const addNewStudent = document.querySelector('.add-save-teacher-btn');
const inputFirstname = document.querySelector('.input__firstname')
const inputLastname = document.querySelector('.input__lastname')
const inputNumber = document.querySelector('.input__number')
const inputurl = document.querySelector('.input__url')
const inputemail = document.querySelector('.input__email')
const inputbirthday = document.querySelector('.input__birthday')
const inputcheck = document.querySelector('.input__check')
const selectedInput = document.querySelector('.selected-input')
let allPerson = document.querySelector('.all__person');
let selectTeacehrs = document.querySelector(".select__teachers");
const loading = document.querySelector('.loading')

addBtn.addEventListener('click', () => {
    modal.setAttribute('id', 'add')
    modal.style.display = 'block'
    addNewStudent.textContent = 'Add new Student'
    inputFirstname.value = ''
    inputLastname.value = ''
    inputNumber.value = ''
    inputurl.value = ''
    inputbirthday.value = ''
    inputemail.value = ''
    inputcheck.checked = false
})
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})
closeBtn2.addEventListener('click', () => {
    modal.style.display = 'none'
})

inputForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let teacherId = localStorage.getItem('teacherId');
    let today = new Date().toLocaleDateString()
    let studentdata = {
        "createdAt": today,
        "firtsName": inputFirstname.value,
        "lastName": inputLastname.value,
        "avatar": inputurl.value,
        "birthday": inputbirthday.value,
        "field": `field ${teacherId}`,
        "isWork": inputcheck.checked,
        "phoneNumber": inputNumber.value,
        "email": inputemail.value,
        teacherId
    };
    if (modal.id == 'add') {
        console.log(teacherId);
        await request.post(`teacher/${teacherId}/student`, studentdata);
        modal.style.display = "none";
        await getStudents({ teacher_id: localStorage.getItem("teacherId") });
    } else if (modal.id == 'edit') {
        let studentId = selectedInput.value;
        await request.put(`teacher/${teacherId}/student/${studentId}`, studentdata);
        modal.style.display = "none";
        await getStudents({ teacher_id: localStorage.getItem("teacherId") });
    }
})

async function teachersSelect() {
    let { data } = await request.get(`teacher`);

    data.map(teacher => {
        const newOption = document.createElement('option');
        newOption.value = teacher.id
        newOption.textContent = teacher.firstName;
        selectTeacehrs.append(newOption)
    })
    selectTeacehrs.value = localStorage.getItem('teacherId')
};
selectTeacehrs.addEventListener('change', () => {

    localStorage.setItem('teacherId', selectTeacehrs.value)
    getStudents({ teacher_id: selectTeacehrs.value })
})

teachersSelect()

let searchInput = document.querySelector('.search__input');
searchInput.addEventListener('keyup', async () => {
    getStudents({ teacher_id: localStorage.getItem("teacherId"), q: searchInput.value })
})


export async function getStudents({ teacher_id = localStorage.getItem("teacherId"), q = "" }) {
    try {
        if (cardWrapper.textContent === '') {
            setTimeout(() => {
                loading.style.display = 'block';
            }, 5000);
        } else {
            loading.style.display = 'none';
        }
        let { data } = await request.get(`teacher/${teacher_id}/student`);
        let filtersdata = [...data]

        if (q) {
            filtersdata = data.filter(student => {
                if (student.firtsName.toLowerCase().includes(q.toLowerCase())) {
                    return student
                }
            })
        }

        cardWrapper.textContent = ''
        allPerson.textContent = `${filtersdata.length}`
        filtersdata.map((student) => {
            const card = createStudent(student)
            cardWrapper.append(card)
        })

        let nima = filtersdata.length
        if (nima == 0) {
            cardWrapper.innerHTML = 'Page Not Found'
            loading.style.display = 'none'
        }

    } catch (err) {
        console.log(err.message);
    }
}

getStudents({ teacher_id: localStorage.getItem("teacherId") })
export { request, modal, addNewStudent, inputFirstname, inputLastname, inputNumber, inputurl, inputemail, inputbirthday, inputcheck, selectedInput };
