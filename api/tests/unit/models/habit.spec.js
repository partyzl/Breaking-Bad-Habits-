const Habit = require("../../../Models/habit");
const db = require("../../../dbConfig");

const pg = require("pg");
const { sortByUserName } = require("../../../Models/habit");
jest.mock("pg");

describe("Habit", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("sort by username", () => {
    test("shows all habits of the user", async () => {
      let habits = [
        {
          habitId: 1,
          username: "testy",
          habit: "drink",
          selectedDays: [1, 5],
        },
        {
          habitId: 2,
          username: "testy",
          habit: "not drink",
          selectedDays: [2, 3],
        },
        {
          habitId: 3,
          username: "notTesty",
          habit: "drink a lot",
          selectedDays: [4],
        },
      ];
      jest.spyOn(Habit, "sortByUserName").mockResolvedValue({ rows: [habit] });
      const result = await Habit.sortByUserName("testy");
      expect(result[0].habit).toEqual(habits[0].habit);
      expect(result[1].habit).toEqual(habits[1].habit);
      expect(result).toHaveLength(2);
    });
  });
});
