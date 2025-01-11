const Transaction = require('../models/Transaction');
const getBarChartData = async (req, res) => {
  const { month } = req.query;

  try {
    const filter = {};

    if (month) {
      filter.dateOfSale = { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) };
    }

    const barChartData = await Transaction.aggregate([
      { $match: filter },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 50, 100, 150, 200, 500],
          default: 'Other',
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.json({ results: barChartData });
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getPieChartData = async (req, res) => {
  const { month } = req.query;

  try {
    const filter = {};

    if (month) {
      filter.dateOfSale = { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) };
    }

    const pieChartData = await Transaction.aggregate([
      { $match: filter },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.json(pieChartData);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getBarChartData, getPieChartData };
