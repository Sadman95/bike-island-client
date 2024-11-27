import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Page Views',
        data: [30, 20, 50, 40, 60, 70, 90],
        borderColor: 'blue',
        fill: true,
      },
      {
        label: 'Sessions',
        data: [20, 40, 30, 60, 50, 80, 100],
        borderColor: 'green',
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
