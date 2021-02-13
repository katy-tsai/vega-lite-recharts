import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { colorProcessor } from "../../../utils/chartDataUtil";
import renderActiveShape from './renderActiveShape';
import PieChartLabel from './PieChartLabel';
import PieTooltip from './PieTooltip';
const pieColors = ['#B8580A', '#1988B9', '#0EA8A7', '#FF8042'];
const defaultMargin = { top: 5, right: 5, bottom: 5, left: 5 };
const ArcChart = ({
    data,
    mark,
    colorAxis,
    thetaAxis,
    colors = pieColors,
    width,
    height,
    isLegend = true,
    chartMargin
}) => {
    const { outerRadius, innerRadius, tooltip: isTooltip } = mark;
    const { scale, field: namekey } = colorAxis || {};
    const { field: datakey } = thetaAxis;
    const [activeIndex, setActiveIndex] = useState(null);
    const onPieEnter = (data, index) => {
        setActiveIndex(index)
    }
    const onPieLeave = (data, index) => {
        setActiveIndex(null)
    }
    const margin = { ...defaultMargin, ...chartMargin };
    return (
        <PieChart width={width} height={height} margin={margin}>
            <Pie
                data={data}
                dataKey={datakey}
                nameKey={namekey}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={0}
                label={<PieChartLabel data={data} dataKey={datakey} nameKey={namekey} colors={colors} scale={scale} mark={mark} activeIndex={activeIndex} />}
                onMouseOver={onPieEnter}
                onMouseOut={onPieLeave}
            >
                {
                    data.map((entry, index) => {
                        const key = entry[namekey];
                        let fillColor = colorProcessor(key, index, scale, colors, mark);
                        return <Cell
                            key={`${datakey}_${index}`}
                            fill={fillColor}
                        />
                    })
                }
            </Pie>
            {isTooltip ? <Tooltip content={<PieTooltip />} /> : ""}
            {colorAxis.field && isLegend && <Legend iconType="circle" iconSize={12} />}

        </PieChart>
    );
};

export default ArcChart;