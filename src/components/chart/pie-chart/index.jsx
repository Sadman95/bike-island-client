import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';



export default function _PieChart({ height = 500, width = 0, data = null }) {
  return (
    <PieChart
      series={[
        {
          data: data,

          innerRadius: Math.ceil(width*12 / 100),
          outerRadius: Math.ceil(width*22 / 100),
        },
      ]}
      height={height}
      width={width}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
}
