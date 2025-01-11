import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = ({ barChartData }) => {
  const data = {
    labels: barChartData.map((item) => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="mb-4">
      <h2>Price Range Distribution</h2>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
