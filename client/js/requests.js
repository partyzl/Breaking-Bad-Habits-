// get all habits 
async function getHabits(user) {
    try {
        const response = await fetch(`http://localhost:3000/${user}`);
        const data = await response.json();
        return data;
    } catch (error) {

    }
}

// get specific habit 
async function getOneHabit(user, habitId) {
    try {
        const response = await fetch(`http://localhost:3000/${user}/${habitId}`);
        const data = await response.json();
        return data;
    } catch (error) {

    }
}

// see streak for one habit
async function seeStreaks(user, habitId) {
    try {
        const response = await fetch(`http://localhost:3000/${user}/${habitId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn(err);
    }
}

async function seeAllStreaks(user) {
    try {
        const response = await fetch(`http://localhost:3000/${user}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn(err);
    }
}

// add habit
async function addHabit(e, user) {
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

    } catch (error) {
        console.warn(err);
    }
}

// change habit frequency/ name
async function updateHabit(user, habitId) {
    try {
        // change habit name 
    } catch (error) {
        console.warn(err);
    }
}

// reset tracker for one habit
async function dangerZone(user, habitId) {
    try {
        // reset tracker
    } catch (error) {
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
    } catch (error) {
        console.warn(err);
    }
}

module.exports = { getHabits, getOneHabit, seeStreaks, seeAllStreaks, addHabit, updateHabit, dangerZone, deleteHabit }