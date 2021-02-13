import React from 'react';
import { colorProcessor } from "../../../utils/chartDataUtil";
const PieChartLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
    data,
    nameKey,
    colors,
    activeIndex,
    mark,
    scale
}) => {
    const RADIAN = Math.PI / 180;
    // eslint-disable-next-line
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    // eslint-disable-next-line
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const key = data[index][nameKey];
    let fillColor = colorProcessor(key, index, scale, colors, mark);
    return (
        <text
            x={x}
            y={y}
            fill={activeIndex === index ? fillColor : "#525050"}
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {data[index][nameKey]} {value}%
        </text>
    );
};

export default PieChartLabel;