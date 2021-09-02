let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
//const backDrop = document.getElementById('modalBackDrop');
const habitInput = document.getElementById('habitInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  //backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  habitInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  //backDrop.style.display = 'none';
  habitInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (!!habitInput.value) {
    habitInput.classList.remove('error');

    events.push({
      date: clicked,
      title: habitInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    habitInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

let i = 0;

function progress() {
  if (i === 0) {
    i = 1;
    let elem = document.getElementByClass("progress-bar");
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
}

initButtons();
load();


// function generate_year_range(start, end) {
//     let years = "";
//     for (let year = start; year <= end; year++) {
//         years += "<option value='" + year + "'>" + year + "</option>";
//     }
//     return years;
//   }
  
//   let today = new Date();
//   let currentMonth = today.getMonth();
//   let currentYear = today.getFullYear();
//   let selectYear = document.getElementById("year");
//   let selectMonth = document.getElementById("month");
  
  
//   let createYear = generate_year_range(1970, 2050);
//   /** or
//   * createYear = generate_year_range( 1970, currentYear );
//   */
  
//   document.getElementById("year").innerHTML = createYear;
  
//   let calendar = document.getElementById("calendar");
//   let lang = calendar.getAttribute('data-lang');
  
//   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
//   let dayHeader = "<tr>";
//   for (day in days) {
//     dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
//   }
//   dayHeader += "</tr>";
  
//   document.getElementById("thead-month").innerHTML = dayHeader;
  
  
//   monthAndYear = document.getElementById("monthAndYear");
//   showCalendar(currentMonth, currentYear);
  
  
  
//   function next() {
//     currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
//     currentMonth = (currentMonth + 1) % 12;
//     showCalendar(currentMonth, currentYear);
//   }
  
//   function previous() {
//     currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
//     currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
//     showCalendar(currentMonth, currentYear);
//   }
  
//   function jump() {
//     currentYear = parseInt(selectYear.value);
//     currentMonth = parseInt(selectMonth.value);
//     showCalendar(currentMonth, currentYear);
//   }
  
//   function showCalendar(month, year) {
  
//     let firstDay = ( new Date( year, month ) ).getDay();
  
//     tbl = document.getElementById("calendar-body");
  
    
//     tbl.innerHTML = "";
  
    
//     monthAndYear.innerHTML = months[month] + " " + year;
//     selectYear.value = year;
//     selectMonth.value = month;
  
//     // creating all cells
//     let date = 1;
//     for ( let i = 0; i < 6; i++ ) {
//         let row = document.createElement("tr");
  
//         for ( let j = 0; j < 7; j++ ) {
//             if ( i === 0 && j < firstDay ) {
//                 cell = document.createElement( "td" );
//                 cellText = document.createTextNode("");
//                 cell.appendChild(cellText);
//                 row.appendChild(cell);
//             } else if (date > daysInMonth(month, year)) {
//                 break;
//             } else {
//                 cell = document.createElement("td");
//                 cell.setAttribute("data-date", date);
//                 cell.setAttribute("data-month", month + 1);
//                 cell.setAttribute("data-year", year);
//                 cell.setAttribute("data-month_name", months[month]);
//                 cell.className = "date-picker";
//                 cell.innerHTML = "<span>" + date + "</span>";
  
//                 if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
//                     cell.className = "date-picker selected";
//                 }
//                 row.appendChild(cell);
//                 date++;
//             }
  
  
//         }
  
//         tbl.appendChild(row);
//     }
//   }