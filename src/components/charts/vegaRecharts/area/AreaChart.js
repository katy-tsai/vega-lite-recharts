import React from "react";
import { Area, Tooltip, Legend } from "recharts";
import ComposedChart from "../composedChart/ComposedChart";
import { colorProcessor, gradientColors } from "../../../utils/chartDataUtil";
import AreaTooltip from './AreaTooltip';
export const areaColors = [
  "#B8580A",
  "#0EA8A7",
  "#1988B9",
  "#FF8042",
  "#ff2626",
  "#fc15dd",
  "#0088FE",
];
const AreaChart = ({
  data,
  sets,
  xAxis,
  yAxis,
  colorAxis,
  mark,
  chartType,
  colors = areaColors,
  width,
  height,
  opacity,
  xAxisLine,
  yAxisLine,
  chartMargin,
  isLegend
}) => {
  const { tooltip: isTooltip } = mark;
  const { scale, field } = colorAxis || {};
  const stacked = colorAxis && colorAxis.field ? { stackId: "stacked " } : "";
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
      {isTooltip ? <Tooltip content={<AreaTooltip />} /> : ""}
      {gradientColors(sets, scale, colors, mark)}
      {[...sets].map((key, index) => {
        let fillColor = colorProcessor(key, index, scale, colors, mark);
        return (
          <Area
            dataKey={key}
            key={`area_${key}_${index}`}
            fill={`url(#Gradient_${index})`}
            fillOpacity={opacity.value}
            stroke={fillColor}
            {...stacked}
          />
        );
      })}
      {showLegend && <Legend iconType="rect" iconSize={12} />}
    </ComposedChart>
  );
};

export default AreaChart;
