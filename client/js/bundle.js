(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _requests = _interopRequireDefault(require("./requests"));

var _url = _interopRequireDefault(require("./url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", loginSubmit);

function loginSubmit(event) {
  window.location.assign("dashboard.html");
  event.preventDefault();
}

function registerSubmit(event) {
  var passwordValue = document.getElementById("registerPasswordInput").value;
  var confirmPasswordValue = document.getElementById("confirmPasswordInput").value;

  if (confirmPasswordValue === passwordValue && registerForm.checkValidity()) {
    window.location.assign("dashboard.html");
  } else if (confirmPasswordValue != passwordValue) {
    document.getElementById("confirmPasswordInput").setCustomValidity(true);
    event.preventDefault();
  }

  registerForm.classList.add("was-validated");
  event.stopPropagation();
}

var registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", registerSubmit);

function requestRegistration(_x) {
  return _requestRegistration.apply(this, arguments);
}

function _requestRegistration() {
  _requestRegistration = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var formData, options, r, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            _context.prev = 1;
            formData = new FormData(e.target);
            options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(Object.fromEntries(formData))
            };
            _context.next = 6;
            return fetch("".concat(_url["default"], "/auth/register"), options);

          case 6:
            r = _context.sent;
            _context.next = 9;
            return r.json();

          case 9:
            data = _context.sent;

            if (!data.err) {
              _context.next = 12;
              break;
            }

            throw Error(data.err);

          case 12:
            requestLogin(e);
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            console.warn(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 15]]);
  }));
  return _requestRegistration.apply(this, arguments);
}

function requestLogin(_x2) {
  return _requestLogin.apply(this, arguments);
}

function _requestLogin() {
  _requestLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
    var formData, options, r, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            _context2.prev = 1;
            formData = new FormData(e.target);
            options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(Object.fromEntries(formData))
            };
            _context2.next = 6;
            return fetch("".concat(_url["default"], "/auth/login"), options);

          case 6:
            r = _context2.sent;
            _context2.next = 9;
            return r.json();

          case 9:
            data = _context2.sent;

            if (data.success) {
              _context2.next = 12;
              break;
            }

            throw new Error("Login not authorised");

          case 12:
            login(data.token);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](1);
            console.warn(_context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 15]]);
  }));
  return _requestLogin.apply(this, arguments);
}

function login(token) {
  var user = (0, _jwtDecode["default"])(token);
  localStorage.setItem("token", token);
  localStorage.setItem("id", user.id);
  localStorage.setItem("username", user.username);
  var landing = document.getElementById("landing");
  landing.className = "hide-page";
  var habit = document.getElementById("habit-page");
  habit.className = "";
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.querySelector(".header-buttons").style.display = "none";
  (0, _requests["default"])();
}

function logout() {
  localStorage.clear();
  location.reload();
}

function currentUser() {
  var username = localStorage.getItem("username");
  return username;
}

module.exports = {
  registerSubmit: registerSubmit,
  requestLogin: requestLogin,
  requestRegistration: requestRegistration,
  logout: logout,
  currentUser: currentUser,
  login: login
};

},{"./requests":5,"./url":6,"jwt-decode":7}],2:[function(require,module,exports){
"use strict";

// set up client-side storage 
var db;

window.onload = function () {
  var request = window.indexedDB.open('habits', 1); // opens db; creates if not already existing

  request.onerror = function () {
    console.log('database failed to open');
  };

  request.onsuccess = function () {
    console.log('database opened successfully');
    db = request.result; // object representing db

    displayHabits();
  }; // runs if db not setup, or is opened with greater version number


  request.onupgradeneeded = function (e) {
    var db = e.target.result; // equivalent to db = request.result
    // create single table in db system

    var objectStore = db.createObjectStore('habits', {
      keyPath: 'id',
      autoIncrement: true
    }); // define what data items it will contain

    objectStore.createIndex('title', 'title', {
      unique: false
    });
    objectStore.createIndex('type', 'type', {
      unique: false
    });
    objectStore.createIndex('history', 'history', {
      unique: false
    });
    objectStore.createIndex('start', 'start', {
      unique: false
    });
    console.log('database setup complete');
  };

  document.getElementById('form').onsubmit = addHabit;
}; //****************** VARIABLES *******************//
// for date header & page header


var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var today = new Date();
var day = today.getDay();
var date = today.getDate();
var month = today.getMonth();
var year = today.getFullYear(); // Getting week number
// function getWeek() {
//   const today = new Date();
//   const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
//   const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
//   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
//   }
// const week = today.getWeek();
// for matching Date.getDateString() output, used for storing responses

var days2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; //****************** VIEW *******************//

var todayHeader = "".concat(daysFull[day].toLowerCase(), ", ").concat(months[month].toLowerCase(), " ").concat(date, ", ").concat(year); // const weekHeader = `Week ${week}, ${months[month]}, ${year}`;

var monthHeader = "".concat(months[month], " ").concat(year);
var currentView = 'today';
document.getElementById('view-header').textContent = todayHeader;

var toggleView = function toggleView() {
  // document.getElementById('view-header').textContent = currentView === 'today' ? todayHeader : weekHeader : monthHeader;
  document.getElementById('view-header').textContent = currentView === 'today' ? todayHeader : monthHeader;
  document.querySelectorAll('.view-option').forEach(function (viewoption) {
    return viewoption.classList.toggle('selected-view');
  });
  document.getElementById('today-view').classList.toggle('hidden'); // document.getElementById('week-view').classList.toggle('hidden');

  document.getElementById('month-view').classList.toggle('hidden');
};

document.querySelectorAll('.view-option').forEach(function (viewoption) {
  viewoption.addEventListener('click', function (e) {
    var selectedView = e.target.id;

    if (selectedView !== currentView) {
      currentView = selectedView;
      toggleView();
    }
  });
}); //****************** DISPLAY HABITS *******************//

function displayHabits() {
  var monthTable = document.getElementById('month-table-body'); // const weekTable = document.getElementById('week-table-body');

  var todayTable = document.getElementById('today-table-body'); // monthTable.innerHTML = weekTable.innerHTML = todayTable.innerHTML = "";

  monthTable.innerHTML = todayTable.innerHTML = ""; // open object store and get cursor (iterates through all data items in store)

  var objectStore = db.transaction('habits').objectStore('habits');

  objectStore.openCursor().onsuccess = function (e) {
    // get reference to cursor
    var cursor = e.target.result;

    if (cursor) {
      var habit = cursor.value; // display month table

      var monthRow = document.createElement('tr');
      addHabitTitleCell(habit, monthRow, 'month-habit-title-cell', 'month');
      addDailyCells(habit, monthRow);
      monthRow.setAttribute('data-habit-id', habit.id);
      monthTable.appendChild(monthRow); // display week table
      // let weekRow = document.createElement('tr');
      // addHabitTitleCell(habit, weekRow, 'week-habit-title-cell', 'week');
      // addDailyCells(habit, weekRow);
      // weekRow.setAttribute('data-habit-id', habit.id);
      // monthTable.appendChild(weekRow);
      // display today table

      var todayRow = document.createElement('tr');
      addCheckboxCell(habit, todayRow);
      addHabitTitleCell(habit, todayRow, 'today-habit-title-cell', 'daily');
      todayRow.setAttribute("data-habit-id", habit.id);
      todayTable.appendChild(todayRow); // iterator to next item in cursor

      cursor["continue"]();
    } else {
      if (!monthTable.innerHTML) {
        var _monthRow = document.createElement('tr');

        var cell = document.createElement('td');
        cell.textContent = "No Habits Yet!";
        cell.setAttribute('colspan', 40);

        _monthRow.appendChild(cell);

        monthTable.appendChild(_monthRow);
      } // if (!weekTable.innerHTML) {
      //   let weekRow = document.createElement('tr');
      //   let cell = document.createElement('td');
      //   cell.textContent = `No Habits Yet!`;
      //   cell.setAttribute('colspan', 40);
      //   weekRow.appendChild(cell);
      //   weekTable.appendChild(weekRow);
      // }


      if (!todayTable.innerHTML) {
        var _todayRow = document.createElement('tr');

        var _cell = document.createElement("td");

        _cell.textContent = "No Habits Yet!";

        _cell.setAttribute("colspan", 40);

        _todayRow.appendChild(_cell);

        todayTable.appendChild(_todayRow);
      }
    }
  };
}

var addCheckboxCell = function addCheckboxCell(habit, row) {
  var checkboxCell = document.createElement('td');
  checkboxCell.classList.add('cell', 'checkbox-cell');
  var dateKey = "".concat(days2[day], " ").concat(months2[month], " ").concat(date, " ").concat(year);
  var response = habit.history[dateKey]; // 'complete', 'incomplete', null/undefined

  if (response) {
    checkboxCell.classList.add(response);

    if (response === "complete") {
      checkboxCell.innerHTML = '<i class="ri-check-line"></i>';
    } else if (response === "incomplete") {
      checkboxCell.innerHTML = '<i class="ri-close-line"></i>';
    }
  }

  checkboxCell.addEventListener("click", function () {
    updateHabit(habit.id, dateKey);
  });
  row.appendChild(checkboxCell);
};

var addHabitTitleCell = function addHabitTitleCell(habit, row, classname, type) {
  var title = document.createElement('td');
  title.classList.add('cell', classname);
  title.textContent = habit.title;
  row.appendChild(title);
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="ri-close-circle-line"></i>';
  deleteButton.addEventListener('click', function () {
    deleteHabit(habit.id);
  });

  if (type === 'month') {
    deleteButton.classList.add('month-delete');
    title.appendChild(deleteButton);
  } else {
    deleteButton.classList.add('today-delete');
    title.appendChild(deleteButton);
  }

  return row;
};

var addDailyCells = function addDailyCells(habit, row) {
  // for comparing whether day falls after habit start date
  var habitStart = habit.start;
  var habitStartNumber = Number("".concat(habitStart.getFullYear()).concat(habitStart.getMonth()).concat(habitStart.getDate()));
  var currDay = startDay;

  var _loop = function _loop() {
    var currDate = i;
    var currDateNumber = Number('' + year + month + i);
    var dateKey = "".concat(days2[currDay], " ").concat(months2[month], " ").concat(i, " ").concat(year);
    var cell = document.createElement('td');
    cell.classList.add('cell', 'daily-cell');
    var response = habit.history[dateKey]; // 'complete', 'incomplete', null/undefined

    if (currDateNumber === habitStartNumber) {
      cell.classList.add("start-date");
    }

    if (response) {
      cell.classList.add(response);

      if (response === 'complete') {
        cell.innerHTML = '<i class="ri-check-line"></i>';
      } else if (response === 'incomplete') {
        cell.innerHTML = '<i class="ri-close-line"></i>';
      } // if no response recorded from previous day yet habit was active auto-mark as incomplete

    } else if (currDateNumber >= habitStartNumber) {
      if (i < date && !response) {
        response = "incomplete";
        cell.classList.add("incomplete");
        cell.innerHTML = '<i class="ri-close-line"></i>';
      }
    } // prevent responses being added to future dates


    if (i <= date) {
      cell.addEventListener('click', function () {
        updateHabit(habit.id, dateKey);
      });
    }

    row.appendChild(cell);
    currDay++;

    if (currDay === 7) {
      currDay = 0;
    }

    ;
  };

  for (i = 1; i <= monthLength; i++) {
    _loop();
  }
}; //****************** ADD HABITS *******************//


function addHabit(e) {
  e.preventDefault();
  var titleInput = document.getElementById('habit-title-input').value;
  var typeInput = 'daily';
  var newHabit = {
    title: titleInput,
    type: typeInput,
    history: {},
    start: new Date()
  };
  var transaction = db.transaction(['habits'], 'readwrite');
  var objectStore = transaction.objectStore("habits");
  var request = objectStore.add(newHabit);

  request.onsuccess = function () {
    document.getElementById('habit-title-input').value = '';
  };

  transaction.oncomplete = function () {
    console.log('transaction complete: database modification finished');
    displayHabits();
  };

  transaction.onerror = function () {
    console.log('transaction not opened due to error');
  };
} //****************** UPDATE HABITS *******************//


function updateHabit(habitId, dateKey) {
  var objectStore = db.transaction(['habits'], 'readwrite').objectStore('habits');
  var objectStoreHabitRequest = objectStore.get(habitId);

  objectStoreHabitRequest.onsuccess = function () {
    var habit = objectStoreHabitRequest.result;
    var currResponse = habit.history[dateKey];
    var newResponse;

    if (currResponse === 'complete') {
      newResponse = 'incomplete';
    } else if (currResponse === 'incomplete') {
      newResponse = null;
    } else {
      newResponse = 'complete';
    }

    habit.history[dateKey] = newResponse;
    console.log(habit);
    var updateHabitRequest = objectStore.put(habit);

    updateHabitRequest.onsuccess = function () {
      displayHabits();
      console.log('habit response saved');
    };
  };
} //****************** DELETE HABITS *******************//


function deleteHabit(habitId) {
  var deleteRequest = db.transaction(['habits'], 'readwrite').objectStore('habits')["delete"](habitId);

  deleteRequest.onsuccess = function () {
    console.log('habit successfully deleted');
    displayHabits();
  };
} //****************** DISPLAY DATE HEADERS *******************//


var getMonthStartDay = function getMonthStartDay() {
  var currDate = today.getDate();
  var currDay = today.getDay();
  var startDay = 0;
  var dayCount = currDay;

  for (var dateCount = currDate; dateCount > 0; dateCount--) {
    if (dayCount === -1) {
      dayCount = 6;
    }

    if (dateCount === 1) {
      startDay = dayCount;
    }

    dayCount--;
  }

  return startDay;
};

var dateHeaderRow = document.getElementById("date-header-row");
var startDay = getMonthStartDay();
var monthLength = monthLengths[month];

var addDayAndDateCells = function addDayAndDateCells() {
  // add date cells
  for (var _i = 1; _i <= monthLength; _i++) {
    var cell = document.createElement("td");
    cell.classList.add("cell", "date-cell");
    cell.textContent = _i;

    if (_i === date) {
      cell.classList.add("highlight");
    }

    dateHeaderRow.appendChild(cell);
  } // add days above dates


  var allDateCells = document.querySelectorAll(".date-cell");

  for (var _i2 = 0; _i2 < allDateCells.length; _i2++) {
    var _day = document.createElement("div");

    _day.textContent = days[_i2 % 7];

    allDateCells[_i2].prepend(_day);
  }
};

addDayAndDateCells();

},{}],3:[function(require,module,exports){
// const API_URL = require('./url');
// async function renderHabits(data) {
//   const feed = document.getElementById('habit-list');
//   const habits = document.createElement('div');
//   const allHabits = (habitData) => {
//     let format_c_date;
//     if (habitData.streak_complete) {
//       const complete_date = new Date(habitData.streak_complete)
//       format_c_date = formatDate(complete_date)
//     } else {
//       format_c_date = 'Not completed yet.'
//     }
//     const end_date = new Date(habitData.streak_end)
//     let format_e_date = formatDate(end_date)
//     const habit = document.createElement('div');
//     habit.id = habitData.id;
//     habit.className = "single-habit";
//     const name = document.createElement('h3');
//     name.textContent = habitData.name;
//     name.className = "habit-name";
//     const desc = document.createElement('p');
//     desc.textContent = habitData.desc;
//     desc.className = "habit-desc";
//     const freq = document.createElement('p');
//     freq.textContent = `Frequency: ${habitData.frequency}`;
//     freq.className = "habit-freq";
//     const track = document.createElement('p');
//     track.id = `count-${habitData.id}`
//     track.textContent = `Streak: ${habitData.streak_track}`;
//     track.className = "habit-track";
//     const startDate = document.createElement('p');
//     startDate.textContent = `When you can next complete this habit: ${format_c_date}`;
//     startDate.className = "habit-complete-date";
//     const endDate = document.createElement('p');
//     endDate.textContent = `Streak end date: ${format_e_date}`;
//     endDate.className = "habit-streak-end";
//     endDate.style = 'margin-bottom: 10px;'
//     const checkBoxLabel = document.createElement('label');
//     checkBoxLabel.for=`complete-${habitData.id}`;
//     checkBoxLabel.textContent = 'Mark as complete: '
//     checkBoxLabel.className = "habit-check-label";
//     const checkBox = document.createElement('input');
//     checkBox.className = "habit-checkbox";
//     const current_date = new Date();
//     const old_date = new Date(habitData.streak_complete)
//     checkBox.type = "checkbox";
//     checkBox.id = `complete-${habitData.id}`;
//     checkBox.name = `complete-${habitData.id}`;
//     if(old_date && old_date > current_date) {
//       checkBox.checked = true;
//       checkBox.disabled = true;
//     } else {
//       checkBox.disabled = false;
//     }
//     console.log(updateHabitClient);
//     console.log(checkBox);
//     checkBox.addEventListener('change', updateHabitClient)
//     habit.appendChild(name);
//     habit.appendChild(desc);
//     habit.appendChild(freq);
//     habit.appendChild(track);
//     habit.appendChild(startDate);
//     habit.appendChild(endDate);
//     habit.appendChild(checkBoxLabel);
//     habit.appendChild(checkBox);
//     feed.prepend(habit);
//   }
//   data.forEach(allHabits);
// }
// async function updateHabit(e) {
//     e.target.disable = true;
//     const habit_id = e.target.parentElement.id;
//     try {
//         const options = {
//             method: 'PATCH',
//             headers: new Headers({'Authorization': localStorage.getItem('token')}),
//         }
//         const response = await fetch(`${API_URL}/habits/${habit_id}`, options);
//         const data = await response.json();
//         console.log(data);
//         if (data.err){ throw Error(data.err) }
//         updateStreak(data);
//     } catch (err) {
//         console.warn(err);
//     }
// }
// async function updateStreak(data) {
//   let id = localStorage.getItem('id')
//   let count = data.streak_track;
//   let checkedBox = document.getElementById(`complete-${data.id}`);
//   checkedBox.disabled = true;
//   let theCounter = document.getElementById(`count-${data.id}`)
//   theCounter.textContent = `Streak: ${count}`;
// }
// function formatDate(date) {
//   const monthNames = ["January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"];
//   const month = monthNames[date.getMonth()];
//   const day = String(date.getDate()).padStart(2, '0');
//   const year = date.getFullYear();
//   const format_date = month  + '\n'+ day  + ',' + year;
//   return format_date;
// }
// module.exports = {renderHabits, updateStreak};
"use strict";

},{}],4:[function(require,module,exports){
"use strict";

var _require = require('./auth'),
    requestLogin = _require.requestLogin,
    requestRegistration = _require.requestRegistration,
    logout = _require.logout;

var _require2 = require('./requests'),
    postHabit = _require2.postHabit;

var loginForm = document.getElementById('login-form');
var registerForm = document.getElementById('register-form');
var habitForm = document.getElementById('habit-form');
var signOutButton = document.getElementById('sign-out');
loginForm.addEventListener('submit', requestLogin);
registerForm.addEventListener('submit', requestRegistration);
habitForm.addEventListener('submit', postHabit);
signOutButton.addEventListener('click', logout);

},{"./auth":1,"./requests":5}],5:[function(require,module,exports){
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// get all habits 
function getHabits(_x) {
  return _getHabits.apply(this, arguments);
} // get specific habit 


function _getHabits() {
  _getHabits = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username) {
    var options, response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            options = {
              headers: new Headers({
                'Authorization': localStorage.getItem('token')
              })
            };
            _context.next = 4;
            return fetch("http://localhost:3000/user/".concat(username), options);

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.warn(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _getHabits.apply(this, arguments);
}

function getOneHabit(_x2, _x3) {
  return _getOneHabit.apply(this, arguments);
} // see streak for one habit


function _getOneHabit() {
  _getOneHabit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, habitId) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetch("http://localhost:3000/".concat(username, "/").concat(habitId));

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.json();

          case 6:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.warn(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _getOneHabit.apply(this, arguments);
}

function seeStreaks(_x4, _x5) {
  return _seeStreaks.apply(this, arguments);
}

function _seeStreaks() {
  _seeStreaks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username, habitId) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return fetch("http://localhost:3000/".concat(username, "/").concat(habitId));

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.json();

          case 6:
            data = _context3.sent;
            return _context3.abrupt("return", data);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.warn(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _seeStreaks.apply(this, arguments);
}

function seeAllStreaks(_x6) {
  return _seeAllStreaks.apply(this, arguments);
} // add habit


function _seeAllStreaks() {
  _seeAllStreaks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return fetch("http://localhost:3000/".concat(user));

          case 3:
            response = _context4.sent;
            _context4.next = 6;
            return response.json();

          case 6:
            data = _context4.sent;
            return _context4.abrupt("return", data);

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            console.warn(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return _seeAllStreaks.apply(this, arguments);
}

function postHabit(_x7, _x8) {
  return _postHabit.apply(this, arguments);
} // change habit frequency/ name


function _postHabit() {
  _postHabit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e, user) {
    var options, response, newHabit;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            e.preventDefault();
            _context5.prev = 1;
            options = {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
            };
            _context5.next = 5;
            return fetch("http://localhost:3000/".concat(user), options);

          case 5:
            response = _context5.sent;
            _context5.next = 8;
            return response.json();

          case 8:
            newHabit = _context5.sent;
            return _context5.abrupt("return", newHabit);

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.warn(_context5.t0);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return _postHabit.apply(this, arguments);
}

function updateHabit(_x9, _x10) {
  return _updateHabit.apply(this, arguments);
} // reset tracker for one habit


function _updateHabit() {
  _updateHabit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user, habitId) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            try {// change habit name 
            } catch (err) {
              console.warn(err);
            }

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _updateHabit.apply(this, arguments);
}

function dangerZone(_x11, _x12) {
  return _dangerZone.apply(this, arguments);
} // delete habit


function _dangerZone() {
  _dangerZone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(user, habitId) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            try {// reset tracker
            } catch (err) {
              console.warn(err);
            }

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _dangerZone.apply(this, arguments);
}

function deleteHabit(_x13, _x14) {
  return _deleteHabit.apply(this, arguments);
}

function _deleteHabit() {
  _deleteHabit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(user, habitId) {
    var options;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            options = {
              method: 'DELETE'
            };
            _context8.next = 4;
            return fetch("http://localhost:3000/".concat(user, "/").concat(habitId), options);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8["catch"](0);
            console.warn(_context8.t0);

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 6]]);
  }));
  return _deleteHabit.apply(this, arguments);
}

module.exports = {
  getHabits: getHabits,
  getOneHabit: getOneHabit,
  seeStreaks: seeStreaks,
  seeAllStreaks: seeAllStreaks,
  postHabit: postHabit,
  updateHabit: updateHabit,
  dangerZone: dangerZone,
  deleteHabit: deleteHabit
};

},{}],6:[function(require,module,exports){
"use strict";

module.exports = 'http://localhost:3000';

},{}],7:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[1,2,3,4,5,6]);
