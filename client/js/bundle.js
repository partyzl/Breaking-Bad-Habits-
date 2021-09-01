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
  event.preventDefault();
  var passwordValue = document.getElementById("registerPasswordInput").value;
  var confirmPasswordValue = document.getElementById("confirmPasswordInput").value;

  if (confirmPasswordValue === passwordValue && registerForm.checkValidity()) {
    window.location.assign("dashboard.html");
  } else if (confirmPasswordValue != passwordValue) {
    document.getElementById("confirmPasswordInput").setCustomValidity(true);
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

},{"./requests":2,"./url":3,"jwt-decode":4}],2:[function(require,module,exports){
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// get all habits 
function getHabits(_x) {
  return _getHabits.apply(this, arguments);
} // get specific habit 


function _getHabits() {
  _getHabits = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("http://localhost:3000/".concat(user));

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.warn(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _getHabits.apply(this, arguments);
}

function getOneHabit(_x2, _x3) {
  return _getOneHabit.apply(this, arguments);
} // see streak for one habit


function _getOneHabit() {
  _getOneHabit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user, habitId) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetch("http://localhost:3000/".concat(user, "/").concat(habitId));

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
  _seeStreaks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user, habitId) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return fetch("http://localhost:3000/".concat(user, "/").concat(habitId));

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

},{}],3:[function(require,module,exports){
"use strict";

module.exports = 'http://localhost:3000';

},{}],4:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[1]);
