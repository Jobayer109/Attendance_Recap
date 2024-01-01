const router = require("express").Router();
const authRoutes = require("./auth");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1", authRoutes);

module.exports = router;
