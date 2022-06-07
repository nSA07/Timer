    "use strict";

    let a;
    const btn = document.querySelector('.start');
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    let gear = document.getElementById('settings');
    let form = document.getElementById('form');
    let color = document.querySelector('.ring');
    let time = 0;
    //Listener
    
    gear.addEventListener('click',removeDis);
    btn.addEventListener('click', startTimer);
    
    minutes.value = Math.floor(time / 60);
    seconds.value = time % 60;

    form.addEventListener('change',e => {
        const min = roughScale(minutes) * 60;
        const sec = roughScale(seconds);
        time = min + sec;

    });

    minutes.value = minutes.value < 10 ? "0" + minutes.value : minutes.value;
    seconds.value = seconds.value < 10 ? "0" + seconds.value : seconds.value;

    function roughScale(input) {
        const parsed = parseInt(input.value);
        let result = 0;
        if(isNaN(parsed)) {
            input.value = 0;
        } else {
            result = parsed;
            input.value = parsed <10 ? '0' + parsed : parsed;
        }
        return result;    
    }


    function removeDis () {
        minutes.removeAttribute("disabled");
        seconds.removeAttribute("disabled");
    }

    function startTimer () {
        btn.innerHTML = 'stop';
        btn.removeEventListener('click', startTimer);
        btn.addEventListener('click', stopTimer);
        color.style.stroke = "#09A65A";
        a = setInterval(() => updateTime(minutes, seconds), 100);
    }

    function stopTimer () {
        clearInterval(a);
        color.style.stroke = "red";
        btn.innerHTML = 'start';
        btn.removeEventListener('click', stopTimer);
        btn.addEventListener('click', startTimer);
    }

    function updateTime(minutes, seconds) {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        minutes.value = min;
        seconds.value = sec;
        if(time <= 0) {
            clearInterval(a);
            stopTimer();
            return;
        }
        time--;
    }
