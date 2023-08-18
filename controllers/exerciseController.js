const exerciseModel = require("../models/exerciseModel");

const exerciseController = {
  getAllExercise: async (req, res) => {
    try {
      exerciseModel.find({}, {}).then((exe) => {
        res.status(200).json(exe);
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  postExercise: async (req, res) => {
    try {
      const { exeName, exeType, exeDes } = req.body;

      const exerciseName = exeName.toLowerCase();
      const existingExe = await exerciseModel.findOne({
        exeName: exerciseName,
      });

      if (existingExe) {
        return res.status(409).json({ message: "Exercise already exists" });
      } else {
        const newExe = new exerciseModel({
          exeName: exeName.toLowerCase(),
          exeType,
          exeDes,
        });

        await newExe.save();
        res.status(201).json({ message: "Exercise created successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteExercise: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const matchedExercise = await exerciseModel.findById(id);

      if (!matchedExercise) {
        return res.status(401).json({ message: "Exercise details not found" });
      }
      await exerciseModel.findByIdAndDelete(id);
      res.status(201).json({ message: "Workout deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

module.exports = exerciseController;
