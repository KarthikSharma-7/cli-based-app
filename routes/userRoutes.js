const router = require("express").Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  resetPassword,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateToken");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/update", validateToken, updateUser);
router.get("/allusers", validateToken, getAllUsers);
router.put("/reset", validateToken, resetPassword);

module.exports = router;
