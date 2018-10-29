function createRow(rowData, schedule) {
    let date = new Date();
    let row     = document.createElement('div'),
        timeDiv = document.createElement('div'),
        destDiv = document.createElement('div'),
        statDiv = document.createElement('div'),
        mobDiv  = document.createElement('div'),
        numDiv  = document.createElement('div'),
        time    = document.createElement('p'),
        dest    = document.createElement('p'),
        status  = document.createElement('p'),
        mobStat = document.createElement('div'),
        num     = document.createElement('p');

    row.className = 'schedule__row';
    timeDiv.className = 'schedule__row-content_time';
    destDiv.className = 'schedule__row-content_dest';
    statDiv.className = 'schedule__row-content_status';
    mobDiv.className = 'schedule__row-content_mob-status';
    numDiv.className = 'schedule__row-content_number';
    time.className = 'schedule__row-text';
    dest.className = 'schedule__row-text';
    status.className = 'schedule__row-text';
    mobStat.className = 'schedule__mobile-circle';
    num.className = 'schedule__row-text';

    time.innerHTML = rowData.time;
    dest.innerHTML = rowData.destination;
    num.innerHTML = rowData.number;

    if (rowData.status == 'arrived') {
        status.innerHTML = 'прибыл';
        status.classList.add('schedule__row-text_green');
        mobStat.classList.add('schedule__mobile-circle_green');
    } else if (rowData.status == 'departed') {
        status.innerHTML = 'в полете';
        status.classList.add('schedule__row-text_green');
        mobStat.classList.add('schedule__mobile-circle_green');
    } else if (rowData.status == 'delay') {
        status.innerHTML = 'задерживается';
        status.classList.add('schedule__row-text_red');
        mobStat.classList.add('schedule__mobile-circle_red');
    } else if (rowData.status == 'expected') {
        status.innerHTML = 'ожидается';
    }

    timeDiv.appendChild(time);
    destDiv.appendChild(dest);
    statDiv.appendChild(status);
    mobDiv.appendChild(mobStat);
    numDiv.appendChild(num);

    row.appendChild(timeDiv);
    row.appendChild(destDiv);
    row.appendChild(statDiv);
    row.appendChild(mobDiv);
    row.appendChild(numDiv);


    schedule.appendChild(row);
}

$(function() {
    $.getJSON('data/data.json', function(data) {
        let arrivalShedule = document.getElementsByClassName('schedule_arrive')[0];
        let departureShedule = document.getElementsByClassName('schedule_departure')[0];
        data.arrival.forEach(rowData => {
            createRow(rowData, arrivalShedule.getElementsByClassName('schedule__content')[0]);
        });
        data.departure.forEach(rowData => {
            createRow(rowData, departureShedule.getElementsByClassName('schedule__content')[0]);
        });
    });
});