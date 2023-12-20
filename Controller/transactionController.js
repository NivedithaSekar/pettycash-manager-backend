import Transactions from "../Model/transactionModel.js";
import {
  checkTransactionEligibility,
  updateCapitalBalance,
} from "../Controller/capitalController.js";
import { ObjectId } from "mongodb";

export async function addTransaction(req, res) {
  try {
    const { userId, type, category, description, paidTo, amount } = req.body;
    if (type == "FUND_OUT") {
      const isValidTransaction = await checkTransactionEligibility(
        userId,
        amount
      );
      if (!isValidTransaction) {
        throw {
          message: "Insufficient capital balance for this transaction",
          statusCode: 400,
        };
      }
    }
    const result = await Transactions.create({
      userId,
      type,
      category,
      description,
      paidTo,
      amount,
    }).then((transaction) => updateCapitalBalance(transaction, 0, "CREATE"));
    res.status(201).json({
      message: "Transaction created & Capital Balance updated successfully",
      result,
    });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
}

export async function editTransaction(req, res) {
  const updatedTransactionReq = req.body;
  //transaction update
  const updatedQuery = {};
  const updatedHistory = {};
  const transactionDetail = await Transactions.findById(
    updatedTransactionReq._id
  );
  for (const [key, value] of Object.entries(updatedTransactionReq)) {
    if (value != transactionDetail[key]) {
      updatedHistory[key] = transactionDetail[key];
      updatedQuery[key] = value;
    }
  }
  updatedHistory.updatedAt = transactionDetail.updatedAt;
  updatedQuery.history = transactionDetail.history;
  updatedQuery.history.push(updatedHistory);
  updatedQuery.updatedAt = new Date();

  //capital balance update
  const balanceDifference =
    transactionDetail.type == "FUND_OUT"
      ? transactionDetail.amount - updatedTransactionReq.amount
      : updatedTransactionReq.amount - transactionDetail.amount;
  const updatedTransactionObj = await Transactions.findOneAndUpdate(
    { _id: updatedTransactionReq._id },
    updatedQuery
  ).then((transaction) =>
    updateCapitalBalance(transaction, balanceDifference, "EDIT")
  );
  res.status(201).json({
    message: "Transaction data updated successfully",
    updatedTransactionObj,
  });
}

export async function deleteTransaction(req, res) {
  const { transactionId } = req.params;
  try {
    const deletedRecord = await Transactions.findByIdAndDelete(transactionId).then((transaction) =>
        updateCapitalBalance(
          transaction,
          transaction.type == "FUND_IN"
            ? -transaction.amount
            : transaction.amount,
          "DELETE"
        )
      );
      res
      .status(201)
      .json({
        message: "Transaction data deleted successfully",
        deletedRecord,
      })
  } catch (error) {
    res.status(404).json({ message: "No transaction found with given ID!", error });
  }
}

export async function getTransactionDetails(req, res) {
  const { transactionId } = req.params;
  try {
    const transactionDetail = await Transactions.findById(transactionId);
    res.status(201).json({
      message: "Transaction data retrieved successfully",
      transactionDetail,
    });
  } catch (error) {
    res.status(404).json({ message: "No transaction found with given ID!" });
  }
}

export async function getAllTransactions(userId) {
  try {
    const transactionDetails = await Transactions.find({userId:userId});
    return transactionDetails
  } catch (error) {
    return { message: "No user is found with given ID!" };
  }
}
