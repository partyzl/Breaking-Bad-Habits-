function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
  }
  
  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectYear = document.getElementById("year");
  let selectMonth = document.getElementById("month");
  
  
  let createYear = generate_year_range(1970, 2050);
  /** or
  * createYear = generate_year_range( 1970, currentYear );
  */
  
  document.getElementById("year").innerHTML = createYear;
  
  let calendar = document.getElementById("calendar");
  let lang = calendar.getAttribute('data-lang');
  
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  let dayHeader = "<tr>";
  for (day in days) {
    dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
  }
  dayHeader += "</tr>";
  
  document.getElementById("thead-month").innerHTML = dayHeader;
  
  
  monthAndYear = document.getElementById("monthAndYear");
  showCalendar(currentMonth, currentYear);
  
  
  
  function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
  }
  
  function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  }
  
  function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
  }
  
  function showCalendar(month, year) {
  
    let firstDay = ( new Date( year, month ) ).getDay();
  
    tbl = document.getElementById("calendar-body");
  
    
    tbl.innerHTML = "";
  
    
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
  
    // creating all cells
    let date = 1;
    for ( let i = 0; i < 6; i++ ) {
        let row = document.createElement("tr");
  
        for ( let j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";
  
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }
  
  
        }
  
        tbl.appendChild(row);
    }
  
  // let today = new Date();
  // let currentMonth = today.getMonth();
  // let currentYear = today.getFullYear();
  // let allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // let yearNum = document.getElementById("yearNum");
  
  // function renderMonths(){
  //     allMonths.forEach(function(month, i){
  //         let months = document.querySelector('.months')
  //         let monthSpan = document.createElement('span')
    
  //         monthSpan.className = 'each-month'
  //         monthSpan.id = i+1
  //         monthSpan.innerHTML =` ${month} `
  //         months.append(monthSpan)
  
  //         monthSpan.addEventListener('click', function(e){
  //             if(document.querySelector('.hidden-p')){
  //                 let sel = document.querySelector('.selected')
  //                 sel.className = "each-month"
  //             }
  //             e.target.className = 'selected'
  //             let newp = document.createElement('p')
  //             newp.className = 'hidden-p'
  //             newp.hidden = true
  //             monthSpan.append(newp)
  //         })
  
  //         document.addEventListener('click', function(e){
  //             if(e.target.className === 'selected'){
  //                 e.preventDefault()
  //                 currentMonth = e.target.id-1
  //                 currentYear = currentYear
  //                 renderCalendar(currentMonth, currentYear)
  //             }
  //         })
  //     })
  // }
  
  // function renderCalendar(month, year) {
  //     let firstDayOfTheMonth = (new Date(year, month)).getDay();
  //     let daysInMonth = 32 - new Date(year, month, 32).getDate();
  
  //     let calendarTable = document.getElementById("calendar-body");
  //     calendarTable.innerHTML = "";
  //     yearNum.innerHTML = `${year}`;
  
  //     let date = 1;
  //     for (let i = 0; i < 6; i++) {
  //         let week = document.createElement("tr");
  
  //         for (let j = 0; j < 7; j++) {
  //             if (i === 0 && j < firstDayOfTheMonth) {
  //                 let day = document.createElement("td");
  //                 let dateNum = document.createTextNode("");
  //                 day.appendChild(dateNum);
  //                 week.appendChild(day);
  //             } else if (date > daysInMonth) {
  //                 break;
  //             } else {
  //                 let day = document.createElement("td");
  //                 let dateNum = document.createTextNode(date);
  //                 if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
  //                     day.title = "today";
  //                 } 
  //                 day.appendChild(dateNum);
  //                 week.appendChild(day);
  //                 date++;
  //                 day.id = `${year}${String(month+1).padStart(2, '0')}${String(dateNum.textContent).padStart(2, '0')}`
  //                 day.className = 'dates'
  //             }
  //         }
  //         calendarTable.appendChild(week);
  //     }
  //     calendarTable.addEventListener('click', function(e){
  //         let hiddenTwo = document.querySelector('.hidden-p2')
  //         if(hiddenTwo){
  //         let sel = document.querySelector('.selected-day')
  //         sel.className = "dates"
  //         }
  //         e.target.className = 'selected-day'
  //         sp.id = e.target.id
  //         let newpp = document.createElement('p')
  //         newpp.className = 'hidden-p2'
  //         newpp.hidden = true
  //         calendarTable.append(newpp)
  //     });
  // }
  
  // function nextYear() {
  //     document.addEventListener('click', function(e){
  //         if(e.target.className === 'triangle-right'){
  //             e.preventDefault()
  //             currentYear = currentYear+1
  //             currentMonth = currentMonth;
  //             renderCalendar(currentMonth, currentYear);     
  //         } 
  //     })
  // }
  
  // function previousYear() {
  //     document.addEventListener('click', function(e){
  //         if(e.target.className === 'triangle-left'){
  //             e.preventDefault()
  //             currentYear = currentYear-1;
  //             currentMonth = currentMonth;
  //             renderCalendar(currentMonth, currentYear);
  //         }
  //     })
  // }
  
  // renderMonths()
  // renderCalendar(currentMonth, currentYear);
  // nextYear()
  // previousYear()