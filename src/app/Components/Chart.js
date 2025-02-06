import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend,Title);

const Chart = (props) => {
  const data = {
    labels: [props.label1, props.label2],
    datasets: [
      {
        data: [props.data1, props.data2],
        backgroundColor: [
          'rgba(243, 231, 233, 0.9)',
          'rgba(27, 11, 243, 0.6)',
        ],
        borderColor: [
          'rgb(238, 229, 231)',
          'rgb(11, 15, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20, 
      }},
      title: {
        position: 'top',
        display: true,
        text: props.title,
       
      },
    },
  };

  return (
    <div className="mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Chart;
