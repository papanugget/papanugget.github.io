const Typewriter = function(txtEle, words, wait = 12000) {
    this.txtEle = txtEle;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}
Typewriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    this.isDeleting ? this.txt = fullTxt.substring(0, this.txt.length -1) : this.txt = fullTxt.substring(0, this.txt.length + 1);
    this.txtEle.innerHTML = `<span class="txt">${this.txt}</span>`;
    let typeSpeed = 250;
    if(this.isDeleting) {
        typeSpeed /= 2;
    }
    if(!this.isDeleting && this.txt === fullTxt) {
        this.typeSpeed = this.wait;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 1500;
    }
    setTimeout(() => this.type(), typeSpeed);
}
const digiClock = function() {
    const now = new Date();
    const dateString = document.querySelector('.server-time');
    let hrs = now.getHours();
    let mins = now.getMinutes();
    let secs = now.getSeconds();
    if(hrs < 10) {
        hrs = '0' + hrs;
    }
    if(mins < 10) {
        mins = '0' + mins;
    }
    if(secs < 10) {
        secs = '0' + secs;
    }
    dateString.innerHTML = `${hrs}:${mins}:${secs}`;
    setTimeout(digiClock, 1000);
}
const openMenu = function() {
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
        }, 350)};

}
const init = function() {
    const txtEle = document.querySelector('.txt-type');
    const words = JSON.parse(txtEle.getAttribute('data-words'));
    const wait = txtEle.getAttribute('data-wait');
    const projectLink = document.querySelector('#projectsLink');
    new Typewriter(txtEle, words, wait);
    digiClock();
    projectLink.addEventListener('click', openMenu);
}
document.addEventListener('DOMContentLoaded', init);