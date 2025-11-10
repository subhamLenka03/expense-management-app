const Transaction = require("../models/transactionModel");
const moment = require("moment");

// ✅ Get All Transactions
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;

    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid,
      ...(type !== "all" && { type }),
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

// ✅ Add Transaction
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating transaction" });
  }
};

// ✅ Edit Transaction
const editTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Transaction Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating transaction" });
  }
};

// ✅ Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting transaction" });
  }
};

// ✅ Export all
module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
