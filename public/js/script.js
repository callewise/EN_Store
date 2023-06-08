const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
  wrapper.classList.remove('active-popup');
});


let text = document.getElementById('text');
let treeLeft = document.getElementById('tree-right');
let treeRight = document.getElementById('tree-right');
let gateLeft = document.getElementById('gate-left');
let gateRight = document.getElementById('gate-right');

window.addEventListener('scroll', () => {
  let value = window.scrollY;

  text.style.marginTop = value * 2.5 + 'px';
  treeLeft.style.left = value * -1.5 + 'px';
  treeRight.style.left = value * 1.5 + 'px';
  gateLeft.style.left = value * 0.5 + 'px';
  gateRight.style.left = value * -0.5 + 'px';
});