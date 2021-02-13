import React from 'react';
import { Sector } from 'recharts';

const renderActiveShape = (props) => {
  const innerOffset = 3;
  const outerOffset = 6;
  const { cx, cy, innerRadius, outerRadius = 100, startAngle, endAngle, fill } = props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius - innerOffset}
      outerRadius={outerRadius + outerOffset}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      stroke='#fff'
    />
  )

};
export default renderActiveShape;