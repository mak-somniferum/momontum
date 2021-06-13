const content = document.querySelector('.content');
const intro = document.querySelector('.intro');
const form = intro.querySelector('.greeting-form');
const input = form.querySelector('input');
input.focus();

const USER_LS = 'user';

function saveUser(event){
    event.preventDefault();
    let name = input.value;
    localStorage.setItem(USER_LS, name);
    paintUser(name);
}

function paintUser(userName){
    const greetingTitle = document.querySelector('.greeting-title');
    const hours = new Date().getHours();
    let greetingText;

    if(hours < 12){
        greetingText = 'Good morining';
    }else if(hours < 18){
        greetingText = 'Good afternoon';
    }else if(hours < 21){
        greetingText = 'Good evening';
    }else{
        greetingText = 'Good night';
    }

    greetingTitle.innerText = `${greetingText}, ${userName}.`;
    
    intro.classList.add('hide');
    content.classList.add('show');
}

const currentUser = localStorage.getItem(USER_LS);

if(currentUser){
    paintUser(currentUser);
} else {
    form.addEventListener('submit', saveUser);
}