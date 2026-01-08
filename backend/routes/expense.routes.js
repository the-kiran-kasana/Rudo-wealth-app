const express = require("express");
const Expense = require("../models/Expense");
const Group = require("../models/Group");
const firebaseAuth = require("../middleware/firebaseAuth");
const validateSplits = require("../utils/splitValidator");

const ExpenseRouter = express.Router();


ExpenseRouter.post("/addExpense", firebaseAuth, async (req, res) => {
  try {
    const { description,amount, groupId = null, paidBy, participants, splitType, splits = [],} = req.body;
    const { uid } = req.user;

    if (groupId) {

      const group = await Group.findById(groupId);

      if (!group)  return res.status(404).json({ message: "Group not found" });

      const memberUIDs = group.members.map(m => m.uid);
      const invalid = participants.some(p => !memberUIDs.includes(p));

      if (invalid) return res.status(400).json({ message: "All participants must be group members" });

    }

    const finalSplits = validateSplits({ amount, splitType,participants, splits, });

    const expense = await Expense.create({
      description,
      amount,
      groupId,
      paidBy,
      participants,
      splitType,
      splits: finalSplits,
      createdBy: uid,
    });

    res.status(201).json({ message: "Expense created",expense,});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * GET EXPENSES
 */
ExpenseRouter.get("/", firebaseAuth, async (req, res) => {
  try {
    const { groupId } = req.query;
    const uid = req.user.uid;

    const query = {
      participants: uid,
    };

    if (groupId) query.groupId = groupId;

    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: "Fetch expenses failed" });
  }
});



module.exports = ExpenseRouter