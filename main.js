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
    navbarMenu.classList.remove('open');
    scrollIntoView(link); 
    selectNavItem(target);
});

const toggleBtn = document.querySelector('.navbar__toggle-btn');
toggleBtn.addEventListener('click', (event) =>{
    navbarMenu.classList.toggle('open');
});



//dsfdsfsdfsdfdsf


// const option = {
//     root: null, //viewport
//     threshold: 1,
// };
// const sections = document.querySelectorAll('section');
// const navbarItems = document.querySelectorAll('.navbar__menu__item');
// const observer = new IntersectionObserver((entries, observe, option) => {
//     entries.forEach(entry =>{
//         const navbarItems = document.querySelectorAll('.navbar__menu__item');
//         const type = entry.target.dataset.type;
//         if(type == null){
//             return;
//         };
//         navbarItems.forEach(menu => {
//             const link = menu.dataset.link;
//             if(link == null){
//                 return;
//             };
//             if(entry.isIntersecting && type === link){
//                 menu.classList.add('active');
//             }
//             else{
//                 menu.classList.remove('active');
//             }
//         });
        
//     });
// });

// sections.forEach(section => observer.observe(section));

//

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    console.log(selected);
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOption = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
};
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // console.log(entry);
        if(entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index);
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }
            else{
                selectedNavIndex = index - 1;
            }
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', (event) => {
    console.log(window.scrollY);
    console.log(window.scrollY + window.innerHeight);
    console.log(document.body.clientHeight);
    if(window.scrollY === 0){
        selectedNavIndex = 0;
        selectNavItem(navItems[selectedNavIndex]);
    }
    else if(window.scrollY + window.innerHeight >= document.body.clientHeight){
        selectedNavIndex = 5;
        selectNavItem(navItems[selectedNavIndex]);
    }
    else {
        selectNavItem(navItems[selectedNavIndex]);
    }
});

//handle scrolling when tapping on the 'Contact me' button

const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', (event) =>{
    const target = event;
    const link = target.dataset.link;
    scrollIntoView(link);
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    return scrollTo;
};

//Make home transparent when it is on the top

const homeContainer = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () =>{
    let scrollPersent;
    scrollPersent = (homeHeight - window.scrollY) / homeHeight;
    homeContainer.style.opacity = scrollPersent;
});

const arrowBtn = document.querySelector('.arrow__btn');
arrowBtn.addEventListener('click', (event) =>{
    scrollIntoView('#home');
});
document.addEventListener('scroll', () =>{
    if(window.scrollY > (homeHeight/2)){
        arrowBtn.style.opacity = 1;
        arrowBtn.style.pointerEvents = 'auto';
    }
    else{
        arrowBtn.style.opacity = 0;
        arrowBtn.style.pointerEvents = 'none';
    }
});

//filtering work project

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
const categoryBtns = document.querySelectorAll('.category__btn');
workBtnContainer.addEventListener('click', (event) =>{
    const filter = event.target.dataset.fliter || event.target.parentNode.dataset.fliter;
    console.log(filter);
    if(filter == null){
        return;
    }
    const active = document.querySelector('.category__btn.selected')
    active.classList.remove('selected');
    const target = 
        event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    target.classList.add('selected');
    projectContainer.classList.add('anime-out');
    setTimeout(() => {
        projects.forEach((project) => {
            const type = project.dataset.type;
            // console.log(project.dataset.type);
            if(filter === '*' || filter === type){
                project.classList.remove('invisible');
                console.log(type);
            }
            else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anime-out');
    }, 300);
    
});



