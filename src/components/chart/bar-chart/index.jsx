import { BarChart } from '@mui/x-charts/BarChart';
import PropTypes from 'prop-types';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

const _BarChart = ({ isLoading = false, series = [], xAxis = [], width = 0, height = 0 }) => (
  <BarChart isLoading={isLoading} width={width} height={height} series={series} xAxis={xAxis} />
);

_BarChart.propTypes = {
  isLoading: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.number),
      label: PropTypes.string,
    }),
  ),
  xAxis: PropTypes.arrayOf(
    PropTypes.shape({
      scaleType: PropTypes.oneOf(['band', 'linear', 'log', 'point', 'pow', 'sqrt', 'time', 'utc']),
      data: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

export default _BarChart;
