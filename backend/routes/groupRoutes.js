const express = require("express");
const groupRoutes = express.Router();
const groupModel = require("../models/Group");
const firebaseAuth = require("../middleware/firebaseAuth");

groupRoutes.post("/add-group", firebaseAuth, async (req, res) => {
  try {
    const { name, type, members = [] } = req.body;
    const { uid, email, name: creatorName } = req.user;


    const formattedMembers = members.map((email) => ({
      uid: null,
      email,
      name: "",
      role: "member",
      balance: 0,
    }));

    const group = await groupModel.create({
      name,
      type,
      createdBy: uid,
      members: [ {
          uid,
          email,
          name: creatorName,
          role: "admin",
          balance: 0,
        },
        ...formattedMembers,
      ],
    });

    res.status(201).json({ message: "Group created successfully",group, });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create group failed" });
  }
});

groupRoutes.get("/getGroup", firebaseAuth, async (req, res) => {
  try {
    const { uid } = req.user;

    const groups = await groupModel.find(
      { "members.uid": uid },
      {
        name: 1,
        type: 1,
        members: 1,
        createdAt: 1,
      }
    );

    res.status(200).json({
      message: "Groups fetched successfully",
      groups,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Track group failed" });
  }
});



module.exports = groupRoutes;
