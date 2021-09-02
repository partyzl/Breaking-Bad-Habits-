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

},{"./requests":6,"./url":7,"jwt-decode":8}],2:[function(require,module,exports){
"use strict";

var nav = 0;
var clicked = null;
var events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
var calendar = document.getElementById('calendar');
var newEventModal = document.getElementById('newEventModal');
var deleteEventModal = document.getElementById('deleteEventModal');
var backDrop = document.getElementById('modalBackDrop');
var eventTitleInput = document.getElementById('eventTitleInput');
var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;
  var eventForDay = events.find(function (e) {
    return e.date === clicked;
  });

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  var dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  var day = dt.getDate();
  var month = dt.getMonth();
  var year = dt.getFullYear();
  var firstDayOfMonth = new Date(year, month, 1);
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  var paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  document.getElementById('monthDisplay').innerText = "".concat(dt.toLocaleDateString('en-us', {
    month: 'long'
  }), " ").concat(year);
  calendar.innerHTML = '';

  var _loop = function _loop(i) {
    var daySquare = document.createElement('div');
    daySquare.classList.add('day');
    var dayString = "".concat(month + 1, "/").concat(i - paddingDays, "/").concat(year);

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      var eventForDay = events.find(function (e) {
        return e.date === dayString;
      });

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        var eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', function () {
        return openModal(dayString);
      });
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);
  };

  for (var i = 1; i <= paddingDays + daysInMonth; i++) {
    _loop(i);
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');
    events.push({
      date: clicked,
      title: eventTitleInput.value
    });
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(function (e) {
    return e.date !== clicked;
  });
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', function () {
    nav++;
    load();
  });
  document.getElementById('backButton').addEventListener('click', function () {
    nav--;
    load();
  });
  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load(); // function generate_year_range(start, end) {
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

},{}],3:[function(require,module,exports){
"use strict";

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./auth":1,"./requests":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";

module.exports = 'http://localhost:3000';

},{}],8:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[1,2,3,4,5,6,7]);
