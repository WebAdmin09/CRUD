import {toggleDark, toggleLight, body, navbar} from './const.js';
toggleDark.addEventListener('click', () => {
    toggleDark.classList.add('dark__mode-remove');
    toggleLight.classList.add('light__mode-remove');
    body.style.backgroundColor = '#202C36';
    navbar.style.backgroundColor = '#2B3844'
    

})

toggleLight.addEventListener('click', () => {
    toggleLight.classList.remove('light__mode-remove')
    toggleDark.classList.remove('dark__mode-remove');
    body.style.backgroundColor = '#CEE6F1';
    navbar.style.backgroundColor = '#84AA9F'
})