import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [month, setMonth] = useState('03'); 
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const transactionRes = await axios.get(`/api/transactions`, {
        params: { search, page, month },
      });
      const statsRes = await axios.get(`/api/statistics`, {
        params: { month },
      });
      const barRes = await axios.get(`/api/bar-chart`, {
        params: { month },
      });
      const pieRes = await axios.get(`/api/pie-chart`, {
        params: { month },
      });

      setTransactions(transactionRes.data.transactions);
      setStatistics(statsRes.data);
      setBarChartData(barRes.data.results);
      setPieChartData(pieRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, page, month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">MERN Stack Challenge</h1>

      {/* Month Dropdown */}
      <div className="mb-3">
        <label htmlFor="month" className="form-label">Select Month</label>
        <select id="month" className="form-select" value={month} onChange={handleMonthChange}>
          {/* Options for months */}
        </select>
      </div>

      {/* Transactions Table */}
      <TransactionsTable transactions={transactions} />

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Statistics */}
      <Statistics statistics={statistics} />

      {/* Bar Chart */}
      <BarChart barChartData={barChartData} />

      {/* Pie Chart */}
      <PieChart pieChartData={pieChartData} />
    </div>
  );
};

export default App;
