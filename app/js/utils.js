Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
  };

function scrollTo(element, to, duration) {
    let start = element.scrollLeft,
        change = to - start,
        currentTime = 0,
        increment = 20;
    let animateScroll = function(){
        currentTime += increment;
        let val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

function getElementByClass (className) {
    return document.getElementsByClassName(className)[0];
}

function radioChanger(radiosHtmlCollection) {
    let array = Array.from(radiosHtmlCollection);
    return {
        radios: array,
        active: array.indexOf(array.find((x) => { return x.checked == true })),
        set: function (n) {
            if (n >= 0 && n < radios.length) {
                this.active = n;
                radios[n].checked = true;
            }
            return this.active;
        },
        forward: function () {
            if (this.active + 1 < radios.length) {
                console.log(this);
                this.active++;
                radios[this.active].checked = true;
            }
            return this.active;
        },
        back: function () {
            if (this.active - 1 >= 0) {
                this.active--;
                radios[this.active].checked = true;
            }
            return this.active;
        }
    }
}

function swipe(element, pathLength, leftSwipe, rigthSwipe) {
    let x,
        delta,
        touch;

    element.addEventListener("touchstart", (e) => {
        x = e.changedTouches[0].pageX;
        touch = true;
    }, false);

    element.addEventListener("touchmove", (e) => {
        delta = e.changedTouches[0].pageX - x;
        if (touch == true && Math.abs(delta) >= pathLength) {
            e.preventDefault();
            touch = false;
            delta < 0 ? leftSwipe() : rigthSwipe();
        }
    }, false);
}