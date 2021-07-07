let viewsMonth = new Date();

let previousButton = document.querySelector('#prevMonth');
previousButton.addEventListener('click', () => {
    removeCalendar();
    viewsMonth.setMonth(viewsMonth.getMonth() - 1);
    createCalendar(document.body, viewsMonth.getFullYear(), viewsMonth.getMonth());
}, null)

let nextButton = document.querySelector('#nextMonth');
nextButton.addEventListener('click',() => {
    removeCalendar();
    viewsMonth.setMonth(viewsMonth.getMonth() + 1);
    createCalendar(document.body, viewsMonth.getFullYear(), viewsMonth.getMonth());
},null)

createCalendar(document.body, viewsMonth.getFullYear(), viewsMonth.getMonth());

function createCalendar(elem, year, month) {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май','Июнь','Июль','Август','Сентябрь', 'Октябрь', 'Ноябрь','Декабрь'];
    let h1 = document.createElement('h1');
    h1.style.textAlign = 'center';
    h1.innerText = `${months[month]} ${year} года`
    previousButton.after(h1);
    let calendar = document.createElement('table');
    calendar.append(createHeader());
    calendar.append(createBody(calendar, year, month));
    calendar.classList.add('calendar')
    elem.append(calendar);
}


function getCountWeeks(year, month) {
    let l = new Date(year, month + 1, 0);
    return Math.ceil( (l.getDate() - (l.getDay()? l.getDay() : 7))/7) + 1;
}


function getDayIndexForFirstDate(year, month) {
    let day = new Date(year, month).getDay();
    if (day === 0) return 6;
    return day - 1;
}


function createHeader() {
    let days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    let tHead = document.createElement('thead');
    let headerTr = document.createElement('tr')
    tHead.append(headerTr);

    for(let day of days) {
        let cellHeader = document.createElement('td');
        cellHeader.classList.add('td');
        cellHeader.innerText = day;
        if (day === "СБ" || day === 'ВС') cellHeader.classList.add('weekend');
        headerTr.append(cellHeader);
    }
    return tHead;
}


function createBody(calendar, year, month) {
    let now = new Date();
    let tBody = document.createElement('tbody');
    createCalendarBodyCarcass(tBody, year, month);

    let daysOfCalendar = tBody.querySelectorAll('td');

    let currentDate = new Date(year, month, 1)
    let firstIndex = getDayIndexForFirstDate(year, month);

    for(let i = firstIndex; i < new Date(year, month + 1, 0).getDate() + firstIndex; i++) {
        daysOfCalendar[i].innerText = currentDate.getDate();
        if (year === now.getFullYear() && month === now.getMonth() && currentDate.getDate() === now.getDate()) {
            daysOfCalendar[i].classList.add('currentDate');
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }



    return tBody;
}


function createCalendarBodyCarcass(tBody, year, month) {
    for (let i = 0; i < getCountWeeks(year, month); i++) {
        let week = document.createElement('tr');

        for (let i = 0; i < 7; i++) {
            let day = document.createElement('td');
            day.classList.add('td');
            if (i === 5 || i === 6) day.classList.add('weekend');
            week.append(day);
        }
        tBody.append(week);
    }
}


function removeCalendar() {
    document.body.removeChild( document.querySelector('table'));
    document.body.querySelector('.container').removeChild( document.querySelector('h1'));
}










