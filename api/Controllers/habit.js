const router = require("express").Router();

//const { verifyToken } = require("../middleware/auth");

const User = require("../Models/user");
const Habit = require("../Models/habit");
const { route } = require("./auth");

//Read all habits for user
router.get("/", async (req, res) => {
  try {
    const result = await Habit.sortByUserName(req.username);
    res.status(200).json({ result });
  } catch (error) {
    res.status.json({ error });
  }
});

//Read habit by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const result = await Habit.findById(id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Create habit for user
router.post("/", async (req, res) => {
  try {
    const newHabit = await Habit.create({
      ...req.body,
      username: req.username,
    });
    res.status(201).json({ newHabit });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//Update frequency of the habit

router.put("/", async (req, res) => {
  try {
    const updateHabit = await Habit.update(
      req.body.habit,
      req.body.selectedDays,
      req.body.username
    );
    res.status(202).json(updateHabit);
  } catch (error) {
    res.status(400).json(error);
  }
});

//Delete habit

router.delete("/", async (req, res) => {
  try {
    let targetHabit = Habit.findById(req.params.habitId);
    await targetHabit.delete();
    res.status(200).end();
  } catch (error) {
    res.status(404).json({error});
  }
});

module.exports = router;