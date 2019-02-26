// console.log('typewriter connected');

// const TypeWriter = function(txtElement, words, wait = 3000) {
//     this.txtElement = txtElement;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
// }

// // Type method
// TypeWriter.prototype.type = function() {
//     // console.log('hello');
//     // current index of word
//     const current = this.wordIndex % this.words.length;
//     // console.log(current);
//     // get text of current word
//     const fullText = this.words[current];
//     // console.log(fullText);
//     // check if in deleting state
//     if(this.isDeleting) {
//         // remove char
//         this.txt = fullText.substring(0, this.txt.length - 1);
//     } else {
//         // add char
//         this.txt = fullText.substring(0, this.txt.length + 1);
//     }
//     // insert txt into element
//     this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
//     // console.log(this.txt)
//     // type speed value
//     let typeSpeed = 300;
//     if(this.isDeleting) {
//         // divide type speed by 2 
//         typeSpeed /= 2;
//     }
//     // check if word is complete
//     if(!this.isDeleting && this.txt === fullText ) {
//         // pause at end of word completion
//         typeSpeed = this.wait;
//         // set delete to true
//         this.isDeleting = true;
//     } else if(this.isDeleting && this.txt === '') {
//         // set delete to false
//         this.isDeleting = false;
//         // move onto next word
//         this.wordIndex++;
//         // pause before start typing
//         typeSpeed = 500;
//     }
//     // runs the function passed in every 500ms
//     setTimeout(() => this.type(), typeSpeed)
// }

// // init on DOM load
// document.addEventListener('DOMContentLoaded', init);

// // init app
// function init() {
//     const txtElement = document.querySelector('.txt-type');
//     const words = JSON.parse(txtElement.getAttribute('data-words'));
//     const wait = txtElement.getAttribute('data-wait');
//     // init typewriter
//     new TypeWriter(txtElement, words, wait);
// }


// ES6 class refactor
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    type() {
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];
        if(this.isDeleting) {
            this.txt = fullText.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullText.substring(0, this.txt.length + 1);
        }
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        let typeSpeed = 300;
        if(this.isDeleting) {
            typeSpeed /= 2;
        }
        if(!this.isDeleting && this.txt === fullText ) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

// init on DOM load
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // init typewriter
    new TypeWriter(txtElement, words, wait);
}