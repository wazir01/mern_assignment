import React from 'react';

const Statistics = ({ statistics }) => {
  return (
    <div className="mb-4">
      <h2>Statistics</h2>
      <p>Total Sales: ${statistics.totalSales}</p>
      <p>Sold Items: {statistics.soldItems}</p>
      <p>Unsold Items: {statistics.unsoldItems}</p>
    </div>
  );
};

export default Statistics;
