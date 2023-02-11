import express from "express";

const router = express.Router();

router.get("/", (req, resp) => {
  resp.send("Hello, this is router response!");
});
router.get("/register", (req, resp) => {
  resp.send("Hello, this is register endpoint!");
});

export default router;
