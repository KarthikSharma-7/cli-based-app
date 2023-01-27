const router = require("express").Router();
const {
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateToken");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/update", validateToken, updateUser);
router.put("/reset", validateToken, resetPassword);

module.exports = router;
