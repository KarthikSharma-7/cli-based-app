const router = require("express").Router();
const validateToken = require("../middleware/validateToken");
const {
  addToStore,
  updateToStore,
  getFromStore,
  deleteFromSTore,
  getAllPairs,
} = require("../controllers/storeControllers");

router.post("/add", validateToken, addToStore);
router.post("/update/:key", validateToken, updateToStore);
router.get("/getValue/:key", validateToken, getFromStore);
router.delete("/delete/:key", validateToken, deleteFromSTore);
router.get("/getAll", validateToken, getAllPairs);

module.exports = router;
