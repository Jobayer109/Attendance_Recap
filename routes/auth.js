const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");
const {
  registerController,
  loginController,
  privateController,
  publicController,
  homeController,
} = require("../controllers/auth");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/", homeController);
router.get("/private", authenticate, privateController);
router.get("/public", publicController);

module.exports = router;
