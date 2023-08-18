const router = require("express").Router();
const exerciseController = require("../controllers/exerciseController");

router.get("/", exerciseController.getAllExercise);
router.post("/", exerciseController.postExercise);
router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
