const Transaction = require('../models/Transaction');
const getTransactions = async (req, res) => {
  const { search, page, month } = req.query;
  const limit = 10; 
  const skip = (page - 1) * limit;

  try {
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (month) {
      filter.dateOfSale = { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) };
    }

    const transactions = await Transaction.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getTransactions };
