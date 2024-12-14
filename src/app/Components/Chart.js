import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  
  
  const data = {
    labels: ['present', 'absent'],
    datasets: [
      {
    
        data: [40,60],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
         
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
         
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display:true
      },
      title: {
        display: true,
        text: 'Doughnut Chart Example',
      },
    },
  };

  return <Chart data={data} options={options} style={{"height":"140px","width":"140px"}} />;
};

export default Chart;
