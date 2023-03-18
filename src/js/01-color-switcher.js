let intervalId = null;

const refs = {
    btnStart:document.querySelector('button[data-start]'),
    btnStop:document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
}
refs.btnStop.setAttribute('disabled', true );
refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop );

function onBtnStart() {
    refs.btnStart.setAttribute('disabled', true );
    refs.btnStop.removeAttribute('disabled');
    intervalId = setInterval(()=>{
    refs.bodyEl.style.background =  getRandomHexColor();
    },1000);
}
function onBtnStop() {
    refs.btnStart.removeAttribute('disabled');
    refs.btnStop.setAttribute('disabled', true );
    clearInterval(intervalId); 
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}