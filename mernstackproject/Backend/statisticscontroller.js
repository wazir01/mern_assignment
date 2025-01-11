const Transaction = require('../models/Transaction');
const getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    const filter = {};

    if (month) {
      filter.dateOfSale = { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) };
    }

    const totalSales = await Transaction.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]);

    const soldItems = await Transaction.aggregate([
      { $match: { ...filter, isSold: true } },
      { $count: 'soldItems' },
    ]);

    const unsoldItems = await Transaction.aggregate([
      { $match: { ...filter, isSold: false } },
      { $count: 'unsoldItems' },
    ]);

    res.json({
      totalSales: totalSales[0]?.total || 0,
      soldItems: soldItems[0]?.soldItems || 0,
      unsoldItems: unsoldItems[0]?.unsoldItems || 0,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getStatistics };
