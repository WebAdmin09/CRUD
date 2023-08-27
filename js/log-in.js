const login = document.querySelector('.login')
const inputEmail = document.querySelector('.input__email')
const inputpassword = document.querySelector('.input__password');
const inputBtn = document.querySelector('.login-btn');
const hintBtn = document.querySelector('.hintBtn');
const hints = document.querySelector('.hints')
const errorhint1 = document.querySelector('.error1')
const errorhint2 = document.querySelector('.error2')
const userinfo = [userName = 'Husan', userPassword = '2023'];

inputBtn.addEventListener('click', () => {
    const email = inputEmail.value;
    const password = inputpassword.value;

    if (email === userinfo[0] && password === userinfo[1]) {
        inputEmail.classList.remove('inputs')
        inputEmail.classList.add('input__email')
        inputpassword.classList.remove('inputs')
        inputpassword.classList.add('input__password')
        window.location.href = '../index.html'
    }
    else {
        inputEmail.classList.add('inputs')
        inputpassword.classList.add('inputs')
        errorhint1.innerHTML = 'Please check and re-enter'
        errorhint2.innerHTML = 'Please check and re-enter'
    }
})

hintBtn.addEventListener('click', () => {
    hints.innerHTML = 'Please Look input of placeholder'
})