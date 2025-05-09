import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props) => {
  const data = {
    labels: [props.label1, props.label2],
    datasets: [
      {
        data: [props.data1, props.data2],
        backgroundColor: [
          'rgb(173, 216, 230)',
          'rgba(27, 11, 243, 0.6)',
        ],
        borderColor: [
          'rgb(173, 216, 230)',
          'rgb(11, 15, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Chart',
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', height: '300px', margin: 'auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Chart;
