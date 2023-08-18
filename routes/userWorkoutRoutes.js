const userWorkoutController = require("../controllers/userWorkoutController");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/", authMiddleware.verifyToken, userWorkoutController.getUserWorkout)
router.post("/", authMiddleware.verifyToken, userWorkoutController.postUserWorkout)
router.delete("/:id", authMiddleware.verifyToken, userWorkoutController.deleteUserWorkout)
router.get("/lastSeven", authMiddleware.verifyToken, userWorkoutController.lastSevenWorkout)
router.get("/lastThirty", authMiddleware.verifyToken, userWorkoutController.lastThirtyWorkout)
router.get("/:startDate/:endDate", authMiddleware.verifyToken, userWorkoutController.getCustomRangeWorkout)
router.get("/:id", authMiddleware.verifyToken, userWorkoutController.getParticularWorkout)
router.put("/:id", authMiddleware.verifyToken, userWorkoutController.editUserWorkout)

module.exports = router