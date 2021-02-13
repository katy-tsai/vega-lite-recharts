import React from 'react';
import { Bar, Tooltip, Legend } from "recharts";
import ComposedChart from "../composedChart/ComposedChart";
import { colorProcessor } from "../../../utils/chartDataUtil";
import BarTooltip from './BarTooltip';
const barColors = [
    '#B8580A', '#0EA8A7', '#1988B9', '#FF8042', '#ff2626', '#fc15dd', '#0088FE'
]
const BarChart = ({
    data,
    sets,
    xAxis,
    yAxis,
    colorAxis,
    mark,
    chartType,
    colors = barColors,
    width,
    height,
    opacity,
    column,
    xAxisLine,
    yAxisLine,
    chartMargin,
    isLegend
}) => {
    const { tooltip: isTooltip } = mark;
    const { scale, field } = colorAxis || {};;
    const stacked = !column && colorAxis && colorAxis.field ? { stackId: "stacked " } : "";
    let showLegend = field ? true : false;
    if (isLegend != undefined) {
        showLegend = isLegend;
    }
    return (
        <ComposedChart
            data={data}
            chartType={chartType}
            xAxis={xAxis}
            yAxis={yAxis}
            width={width}
            height={height}
            xAxisLine={xAxisLine}
            yAxisLine={yAxisLine}
            chartMargin={chartMargin}
        >
            {isTooltip ? <Tooltip cursor={{ fill: '#EDF0F5', opacity: 0.4 }} content={<BarTooltip />} /> : ""}
            {[...sets].map((key, index) => {
                let fillColor = colorProcessor(key, index, scale, colors, mark);
                console.log("key", key);
                console.log("xAxis", xAxis);
                return (
                    <Bar
                        dataKey={key}
                        key={`bar_${index}`}
                        barSize={50}
                        fill={fillColor}
                        fillOpacity={opacity.value}
                        {...stacked} />
                );
            })}
            {showLegend && <Legend iconType="square" iconSize={12} />}
        </ComposedChart>
    );
};

export default BarChart;