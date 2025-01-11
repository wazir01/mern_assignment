import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ pieChartData }) => {
  const data = {
    labels: pieChartData.map((item) => item._id),
    datasets: [
      {
        data: pieChartData.map((item) => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="mb-4">
      <h2>Category Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
