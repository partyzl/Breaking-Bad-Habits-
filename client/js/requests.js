// get all habits 
async function getHabits(username) {
    try {
        const options = { headers: new Headers({ 'Authorization': localStorage.getItem('token') }) }
        const response = await fetch(`http://localhost:3000/user/${username}`, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

// get specific habit 
async function getOneHabit(user, habitId) {
    try {
        const response = await fetch(`http://localhost:3000/${user}/${habitId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

// see streak for one habit
async function seeStreaks(user, habitId) {
    try {
        const response = await fetch(`http://localhost:3000/${user}/${habitId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function seeAllStreaks(user) {
    try {
        const response = await fetch(`http://localhost:3000/${user}`);
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
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const response = await fetch(`http://localhost:3000/${user}`, options);
        const newHabit = await response.json();
        return (newHabit);
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
            method: 'DELETE'
        }
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
    deleteHabit
}