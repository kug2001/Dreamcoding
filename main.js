// whole-script strict mode syntax 
// javaScript is very flexible 
// added ECMAScript 5
'use strict';


//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () =>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }
    else{
        navbar.classList.remove('navbar--dark');
    }
});

//handle scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;

    if (link == null){
        return;
    }
    scrollIntoView(link);
});

//hande scrolling when tapping on the 'Contact me' button

const contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;
    scrollIntoView(link);
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
};
