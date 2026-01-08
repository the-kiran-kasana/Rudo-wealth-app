const express = require("express")
const groupRoutes = express.Router();
const groupModel = require("../models/Group");
const firebaseAuth = require("../middleware/firebaseAuth");


groupRoutes.post("/add-group", firebaseAuth, async (req, res) => {
  try {
    const { name, type, members = [] } = req.body;
    const { uid, email, name: creatorName } = req.user;

    const group = await groupModel.create({
      name,
      type,
      createdBy: uid,
      members: [{ uid, email, name: creatorName, role: "admin",}, ...members,],
    });

    res.status(201).json({ message: "Group created successfully",group,});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create group failed" });
  }
});



module.exports = groupRoutes;
