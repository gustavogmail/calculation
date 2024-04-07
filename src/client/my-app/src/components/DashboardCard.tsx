import React from 'react';

interface DashboardCardProps {
  title: string;
  data: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, data }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{data}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
