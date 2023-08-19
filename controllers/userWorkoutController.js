const userWorkoutModel = require("../models/userWorkoutModel");

const userWorkoutController = {
  getUserWorkout: async (req, res) => {
    try {
      const workouts = await userWorkoutModel
        .aggregate([
          {
            $match: {
              $expr: {
                $eq: ["$userId", { $toObjectId: req.userId }],
              },
            },
          },
          {
            $addFields: {
              totalDuration: {
                $sum: "$exercises.duration",
              },
            },
          },
        ])
        .sort({ _id: "descending" });

      res.status(200).json(workouts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  postUserWorkout: async (req, res) => {
    try {
      const userId = req.userId;
        const { day, exercises } = req.body;
        
      const totalTime = [];

      exercises.map((exe) => totalTime.push(exe.duration));
      const totalDuration = totalTime.reduce(
        (accum, current) => Number(accum) + Number(current)
      );

      const newUserWorkout = new userWorkoutModel({
        userId,
        day: new Date(day),
        totalDuration,
        exercises,
      });

      await newUserWorkout.save();

      res.status(201).json({ message: "Workout added successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteUserWorkout: async (req, res) => {
    try {
      const id = req.params.id;

      const matchedWorkout = await userWorkoutModel.findById(id);

      if (!matchedWorkout) {
        return res.status(401).json({ message: "Workout details not found" });
      }

      await userWorkoutModel.findByIdAndDelete(id);
      res.status(201).json({ message: "Workout deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  lastSevenWorkout: async (req, res) => {
    try {
      const userWorkout = await userWorkoutModel
        .aggregate([
          {
            $match: {
              $expr: {
                $eq: ["$userId", { $toObjectId: req.userId }],
              },
            },
          },
          {
            $addFields: {
              totalDuration: {
                $sum: "$exercises.duration",
              },
            },
          },
        ])
        .sort({ day: "ascending" })
        .limit(7);
      res.json(userWorkout);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  lastThirtyWorkout: async (req, res) => {
    try {
      const userWorkout = await userWorkoutModel
        .aggregate([
          {
            $match: {
              $expr: {
                $eq: ["$userId", { $toObjectId: req.userId }],
              },
            },
          },
          {
            $addFields: {
              totalDuration: {
                $sum: "$exercises.duration",
              },
            },
          },
        ])
        .sort({ day: "ascending" })
        .limit(30);
      res.json(userWorkout);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getCustomRangeWorkout: async (req, res) => {
    try {
      const userId = req.userId;
      const startDate = req.params.startDate;
      const endDate = req.params.endDate;
      const userWorkout = await userWorkoutModel.find({
        userId: userId,
        day: { $gte: startDate, $lte: endDate },
      }).sort({day:"ascending"});

      // const totalTime = [];

      // userWorkout.map(user => user.exercises.map(dur=> totalTime.push(dur.duration)))
      // const totalDuration = totalTime.reduce((accum, current) => accum + current)
      // console.log(totalDuration)
      // .aggregate([
      //   {
      //     $match: {
      //       day: { $gte: startDate, $lte: endDate },
      //     },
      //   },
      // ]);
      // .sort({ day: "ascending" });
      res.json(userWorkout);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getParticularWorkout: async (req, res) => {
    try {
      const id = req.params.id;
      const userWorkout = await userWorkoutModel.findById(id);
      console.log(id);
      res.status(200).json(userWorkout);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  editUserWorkout: async (req, res) => {
    try {
      const id = req.params.id;
      const { exercises } = req.body;
      const userWorkout = await userWorkoutModel.findById(id);

      userWorkout.exercises = exercises;
      const workout = await userWorkoutModel.findByIdAndUpdate(id, userWorkout);

      res.status(200).json(workout);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

module.exports = userWorkoutController;
