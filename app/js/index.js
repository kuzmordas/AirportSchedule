let scheduleWrapper = getElementByClass("main-panel__wrapper"),
    arrivalButton = getElementByClass("switch-button_arrival"),
    departureButton = getElementByClass("switch-button_departure"),
   /* delayButton = getElementByClass("switch-button_delay"),*/
    radios = document.getElementsByClassName('main-panel__text-control'),
    text = getElementByClass("main-panel__text-container");

let activeView = 0,
    changer = radioChanger(radios);

arrivalButton.addEventListener("click", function() {
    activeView = 0;
    scrollTo(scheduleWrapper, 0, 600);
    changer.set(activeView);
}, false);

departureButton.addEventListener("click", function() {
    activeView = 1;
    scrollTo(scheduleWrapper, scheduleWrapper.offsetWidth + 30, 600);
    changer.set(activeView);
}, false);

/*
delayButton.addEventListener("click", function() {
    activeView = 2;
    scrollTo(scheduleWrapper, (scheduleWrapper.offsetWidth + 60) * 2, 600);
    changer.set(activeView);
}, false);
*/

swipe(scheduleWrapper, 70,
      () => {
        scrollTo(scheduleWrapper, scheduleWrapper.scrollLeft + scheduleWrapper.offsetWidth + 10, 600);
        changer.forward();
      },
      () => {
        scrollTo(scheduleWrapper, scheduleWrapper.scrollLeft + (scheduleWrapper.offsetWidth + 10) * -1, 600);
        changer.back();
      });

window.onresize = () => {
    if (activeView == 0) {
        scheduleWrapper.scrollLeft = 0;
    } else if (activeView == 1) {
        scheduleWrapper.scrollLeft = scheduleWrapper.offsetWidth + 30;
    } else {
        scheduleWrapper.scrollLeft = (scheduleWrapper.offsetWidth + 60) * 2;
    }
};


let search = document.getElementById('test');
search.oninput = (e) => {
    let text = e.target.value.toUpperCase();
    let numbDivs = Array.from(document.getElementsByClassName('schedule__row-content_number'));
    numbDivs.forEach((div) => {
        let value = div.children[0].innerHTML;
        let regex = new RegExp('^' + text, 'i');
        if (!regex.test(value)) {
            div.parentNode.classList.add('schedule__row_hidden');
        } else {
            div.parentNode.classList.remove('schedule__row_hidden');
        }
    })
}