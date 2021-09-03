const herokuUrl = "https://habitual-lap2.herokuapp.com/";
// get all habits

async function getHabits(username) {
  try {
    const options = {
      headers: new Headers({ authorization: localStorage.getItem("token") }),
    };
    const response = await fetch(`${herokuUrl}/user/${username}`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}

async function getUsers() {
  try {
    const options = {
      headers: new Headers({ authorization: localStorage.getItem("token") }),
    };
    console.log("got here");
    const response = await fetch("http://localhost:3000/user", options);
    console.log("and here");
    const data = await response.json();
    if (data.err) {
      console.warn(data.err);
      //logout();
    }
    console.log("and also here");
    return data;
  } catch (err) {
    console.warn(err);
  }
}

// get specific habit
async function getOneHabit(username, habitId) {
  try {
    const response = await fetch(
      `http://localhost:3000/user/${username}/${habitId}`
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}

// see streak for one habit
async function seeStreaks(username, habitId) {
  try {
    const response = await fetch(
      `http://localhost:3000/user/${username}/${habitId}`
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}

async function seeAllStreaks(username) {
  try {
    const response = await fetch(`http://localhost:3000/user/${username}`);

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}

// add habit
async function postHabit(e, user) {
  e.preventDefault();
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    };

    const response = await fetch(
      `http://localhost:3000/user/${username}/habits`,
      options
    );

    const newHabit = await response.json();
    return newHabit;
  } catch (err) {
    console.warn(err);
  }
}

// change habit frequency/ name
async function updateHabit(user, habitId) {
  try {
    // change habit name
  } catch (err) {
    console.warn(err);
  }
}

// reset tracker for one habit
async function dangerZone(user, habitId) {
  try {
    // reset tracker
  } catch (err) {
    console.warn(err);
  }
}

// delete habit
async function deleteHabit(user, habitId) {
  try {
    const options = {
      method: "DELETE",
    };
    await fetch(`http://localhost:3000/${user}/${habitId}`, options);
  } catch (err) {
    console.warn(err);
  }
}

module.exports = {
  getHabits,
  getOneHabit,
  seeStreaks,
  seeAllStreaks,
  postHabit,
  updateHabit,
  dangerZone,
  deleteHabit,
  getUsers,
};
