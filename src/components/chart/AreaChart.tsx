import React from 'react';
import { Chart } from 'react-google-charts';

interface GoogleBarChartProps {
  labels: string[];
  data: number[];
  title?: string;
}

const GoogleBarChart: React.FC<GoogleBarChartProps> = ({ labels, data, title }) => {
  const chartData = [['Estado', 'Ações'], ...labels.map((label, index) => [label, data[index]])];

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="AreaChart"
      loader={<div>Carregando Gráfico</div>}
      data={chartData}
      options={{
        title,
        AreaChart: { width: '80%' },
        hAxis: {
          title: 'Estado',
          minValue: 0,
        },
        vAxis: {
          title: 'Ações',
        },
      }}
    />
  );
};

export default GoogleBarChart;