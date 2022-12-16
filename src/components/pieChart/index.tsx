import React from 'react';
import { PieChartData, PieChartProps } from './interfaces';
import { PieCircle } from './style';

const pieChartId = 0;

const Circle = ({
  percent,
  fill,
  offset,
  pathLength,
}: PieChartData & {
  offset: number;
  pathLength: number;
}) => (
  <PieCircle
    fillColor={fill}
    percent={percent}
    offset={offset}
    pathL={pathLength}
  />
);

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const preparedData = data.map((el, index) => ({
    ...el,
    offset:
      index * 2.4 +
      data.slice(0, index).reduce((acc, elem) => acc + elem.percent, 0),
  }));

  const pathLength = preparedData.length * 2.2 + 100;

  return (
    <div
      style={{
        width: 300,
        height: 300,
      }}
    >
      <svg viewBox="0 0 40 40" width={200} height={200}>
        {preparedData.reverse().map((pie, index) => (
          <Circle
            /* eslint-disable-next-line react/no-array-index-key */
            key={`pieChart-${pieChartId}-${index}`}
            percent={pie.percent}
            fill={pie.fill}
            offset={pie.offset}
            pathLength={pathLength}
          />
        ))}
      </svg>
    </div>
  );
};

export default PieChart;
