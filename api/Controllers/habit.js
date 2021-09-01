const router = require("express").Router();

const { verifyToken } = require("../middleware/auth");

const User = require("../Models/user");
const Habit = require("../Models/habit");
const { route } = require("./auth");

//Read all habits for user
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await Habit.sortByUserName(req.username);
    res.status(200).json({ result });
  } catch (error) {
    res.status.send({ error });
  }
});

//Read habit by id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params;
    const result = await Habit.findById(id);
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create habit for user
router.post("/", verifyToken, async (req, res) => {
  try {
    const newHabit = await Habit.create({
      ...req.body,
      username: req.username,
    });
    res.status(201).send({ newHabit });
  } catch (error) {
    res.status(500).send({ error });
  }
});

//Update frequency of the habit

router.put("/", verifyToken, async (req, res) => {
  try {
    const updateHabit = await Habit.update(
      req.body.habit,
      req.body.selectedDays,
      req.body.username
    );
    res.status(202).send(updateHabit);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Delete habit

router.delete("/", verifyToken, async (req, res) => {
  try {
    let targetHabit = Habit.findById(req.param.habitId);
    await targetHabit.delete();
    res.status(200).end();
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;