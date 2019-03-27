// TypeWriter constructor
const TypeWriter = function(txtEle, words, wait = 12000) {
    this.txtEle = txtEle;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// digital clock
const digiClock = function() {
    // set var to current date time
    const now = new Date();
    let hrs = now.getHours();
    let mins = now.getMinutes();
    let secs = now.getSeconds();
    // add 0 to clock numbers if time values less than 10
    if(hrs  < 10) {
        hrs = '0' + hrs;
    }
    if(mins < 10) {
        mins = '0' + mins;
    }
    if(secs < 10) {
        secs = '0' + secs;
    }
    // select server-time element
    const dateString = document.querySelector('.server-time');
    // insert into DOM
    dateString.innerHTML = `${hrs}:${mins}:${secs}`;
    setTimeout(digiClock, 1000);
}
// type method extends TypeWriter prototype
TypeWriter.prototype.type = function() {
    // console.log('hello');
    // current index of word
    const current = this.wordIndex % this.words.length;
    // console.log(current);
    // get text of current word
    const fullTxt = this.words[current];
    // console.log(fullTxt);
    // check if deleting
    this.isDeleting ? this.txt = fullTxt.substring(0, this.txt.length -1) : this.txt = fullTxt.substring(0, this.txt.length + 1);
    // insert txt into element
    this.txtEle.innerHTML = `<span class="txt">${this.txt}</span>`;
    // initial type speed
    let typeSpeed = 250;
    if(this.isDeleting) {
        typeSpeed /= 2;
    }
    // check if word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        // set typespeed to wait value / pause at end of word
        this.typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        // set deleting to false
        this.isDeleting = false;
        // move onto next word
        this.wordIndex++;
        // pause before typing next word
        typeSpeed = 1500;
    }
    // runs type function every .500 secs
    setTimeout( () => this.type(), typeSpeed)
}

// init on DOM load
document.addEventListener('DOMContentLoaded', init)

// init func
function init() {
    // console.log('typewriter connected!');
    // get txtEle span
    const txtEle = document.querySelector('.txt-type');
    // get words array from txtEle span
    const words = JSON.parse(txtEle.getAttribute('data-words'));
    // get wait time from txtEle span
    const wait = txtEle.getAttribute('data-wait');
    // init typewriter
    new TypeWriter(txtEle, words, wait);
    // init clock
    // setTimeout(digiClock(), 1000);
    digiClock();
    // projects link show menu slider
    const projectsLink = document.querySelector('#projectsLink');
    // add eventlistener for click
    projectsLink.addEventListener('click', openProjects);
}

const openProjects = function() {
    const subNav = document.querySelector('.sub-nav');
    const folderIcon = document.querySelector('#folder');    
    if(subNav.classList.contains('menuOff')) {
        setTimeout(() => {
            subNav.classList.remove('menuOff');
            subNav.classList.add('fadeIn');
            folderIcon.classList.remove('fa-folder');
            folderIcon.classList.add('fa-folder-open');
        }, 350);
    } else {
        subNav.classList.remove('fadeIn');
        subNav.classList.add('fadeOut');
        setTimeout(() => {
            subNav.classList.add('menuOff');
            subNav.classList.remove('fadeOut');
            folderIcon.classList.remove('fa-folder-open');
            folderIcon.classList.add('fa-folder');
        }, 350);
    }  
}
