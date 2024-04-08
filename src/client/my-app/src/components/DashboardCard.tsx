import React from 'react';

interface DashboardCardProps {
  title: string;
  data: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, data }) => {
  const getBackgroundColor = (title: string): string => {
    switch (title) {
      case 'Correct result:':
        return 'rgb(142 217 145)'; 
      case 'Incorrect result:':
        return 'rgb(239 68 68)';
      case 'Value not found for specified ID:':
        return 'rgb(251 211 13)';
      case 'Error communicating with database:':
          return 'orange';
      default:
        return 'white';
    }
  };

  const getFontColor = (title: string): string => {
    switch (title) {
      case 'Percentage of correct answers':
        return 'rgb(142 217 145)'; 
      case 'Percentage of incorrect answers':
        return 'rgb(239 68 68)';
      default:
        return 'black';
    }
  };

  const getFontWeight = (title: string): string => {
    switch (title) {
      case 'Percentage of correct answers':
        return 'bold'; 
      case 'Percentage of incorrect answers':
        return 'bold';
      default:
        return 'normal';
    }
  };

  const backgroundColor = getBackgroundColor(title);
  const fontColor = getFontColor(title);
  const fontWeight = getFontWeight(title);

  return (
    <div className="card" style={{ backgroundColor }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text" style={{ color: fontColor, fontWeight: fontWeight }}>{data}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
