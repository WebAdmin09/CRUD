import { ENDPOINT } from './const.js';
import { LIMIT } from './const.js';

import { cardWrapper, createTeacher, selectMarry, selectSort } from './teacher.js';

const request = axios.create({
    baseURL: ENDPOINT,
    timeout: 10000,
});



const addBtn = document.querySelector('.add__btn');
const closeBtn = document.querySelector('.xmark__btn');
const closeBtn2 = document.querySelector('.xmark__btn2');
const modal = document.querySelector('.modal');
const inputForm = document.querySelector('.input__form')
const addNewTeacher = document.querySelector('.add-save-teacher-btn');
const inputFirstname = document.querySelector('.input__firstname')
const inputLastname = document.querySelector('.input__lastname')
const inputNumber = document.querySelector('.input__number')
const inputurl = document.querySelector('.input__url')
const inputemail = document.querySelector('.input__email')
const inputcheck = document.querySelector('.input__check')
const selectedInput = document.querySelector('.selected-input')
// const pagination = document.querySelector('.pagination')
const loading = document.querySelector('.loading')

addBtn.addEventListener('click', () => {
    modal.setAttribute('id', 'add')
    modal.style.display = 'block'
    addNewTeacher.textContent = 'Add new Teacher'
    inputFirstname.value = ''
    inputLastname.value = ''
    inputNumber.value = ''
    inputurl.value = ''
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
    let today = new Date().toLocaleDateString()
    let teacherData = {
        "createdAt": today,
        "firstName": inputFirstname.value,
        "lastName": inputLastname.value,
        "avatar": inputurl.value,
        "groups": [],
        "isMarried": inputcheck.checked,
        "phoneNumber": inputNumber.value,
        "email": inputemail.value,
    };
    if (modal.id == 'add') {
        await request.post("teacher", teacherData);
        modal.style.display = "none";
        await getTeachers();
    } else if (modal.id == 'edit') {
        const teacherId = selectedInput.value;
        await request.put(`teacher/${teacherId}`, teacherData);
        modal.style.display = "none";
        await getTeachers();
    }
})


let searchInput = document.querySelector('.search__input');
searchInput.addEventListener('keyup', async () => {
    getTeachers(searchInput.value)
})



let allPerson = document.querySelector('.all__person');
export async function getTeachers(q) {
    try {
        if (cardWrapper.innerHTML = ``) {
            setTimeout(() => {
                loading.style.display = 'block'
            }, 5000);
        } else {
            loading.style.display = 'none'
        }


        let { data } = await request.get('teacher');
        let filtersdata = []
        filtersdata = selectMarry.value == 'all' ? data : data.filter(teacher => {
            if (teacher.isMarried.toString() == selectMarry.value) {
                return teacher
            }
        })
        filtersdata = filtersdata.sort((a, b) => {
            const lastNameA = a.lastName.toUpperCase();
            const lastNameB = b.lastName.toUpperCase();

            if (selectSort.value == 'A-Z') {
                if (lastNameA < lastNameB) {
                    return -1;
                }
                if (lastNameA > lastNameB) {
                    return 1;
                }
                return 0;
            } else if (selectSort.value == 'Z-A') {
                if (lastNameA > lastNameB) {
                    return -1;
                }
                if (lastNameA < lastNameB) {
                    return 1;
                }
                return 0;
            }
        });

        if (q) {
            filtersdata = filtersdata.filter(teacher => {
                if (teacher.firstName.toLowerCase().includes(q.toLowerCase())) {
                    return teacher
                }
            })
        }

        cardWrapper.textContent = ''
        allPerson.textContent = `${filtersdata.length}`
        filtersdata.map((teacher) => {
            const card = createTeacher(teacher)
            cardWrapper.append(card)
        })

        let nima = filtersdata.length
        if (nima == 0) {
            cardWrapper.innerHTML = 'Page Not Found'
            loading.style.display = 'none'
        }

    } catch (err) {
        console.log(err);
    }
}

getTeachers()

export { request, modal, addNewTeacher, inputFirstname, inputLastname, inputNumber, inputurl, inputemail, inputcheck, selectedInput };


