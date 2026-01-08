const express = require("express")
const groupRoutes = express.Router();
const groupModel = require("../models/Group");
const firebaseAuth = require("../middleware/firebaseAuth");


groupRoutes.post("/AddGroup", firebaseAuth , async(req ,res) => {
      try{
         const {groupName, type, members } = req.body;
         const {uid, email , name : creatorName} = req.user;

         const group = await groupModel.create({
          groupName,type,createdBy: uid,members:[{uid , email,nameMember : creatorName,role:"admin",},...members],
         });

         res.status(201).json({ message: "Group created", group });
      }catch(err){
         res.status(500).json({ message: "Create group failed" });
      }
})

module.exports = groupRoutes;