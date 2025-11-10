const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// router object
const router = express.Router();

// routes

// Add transaction - POST
router.post("/add-transaction", addTransaction);

// Edit transaction - POST
router.post("/edit-transaction", editTransaction);

// Delete transaction - POST
router.post("/delete-transaction", deleteTransaction);

// Get all transactions - POST
router.post("/get-transaction", getAllTransaction);

module.exports = router;
