import React from "react";
import { Line, Tooltip, Legend } from "recharts";
import ComposedChart from "../composedChart/ComposedChart";
import { colorProcessor } from "../../../utils/chartDataUtil";
import LineTooltip from './LineTooltip';
const lineColors = [
  "#da9708",
  "#5e35b1",
  "#e91e63",
  "#fbc02d",
  "#2962ff",
  "#e65100",
  "#00897b",
];

const LineChart = ({
  data,
  sets,
  xAxis,
  yAxis,
  colorAxis,
  mark,
  chartType,
  colors = lineColors,
  width,
  height,
  xAxisLine,
  yAxisLine,
  chartMargin,
  isLegend
}) => {
  const { tooltip: isTooltip, point } = mark;
  const { scale, field } = colorAxis || {};
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
      {isTooltip ? <Tooltip content={<LineTooltip />} /> : ""}
      {[...sets].map((key, index) => {
        let fillColor = colorProcessor(key, index, scale, colors, mark);

        return (
          <Line
            type="monotone"
            dot={point ? Object.keys(point).length > 0 : false}
            dataKey={key}
            key={`line_${key}_${index}`}
            stroke={point.filled ? fillColor : point.stroke}
            fill={fillColor}
            activeDot={{
              r: 5,
              strokeWidth: 1,
              fill: point.filled ? fillColor : "#fff",
            }}
          />
        );
      })}
      {showLegend && <Legend iconType="line" iconSize={12} />}
    </ComposedChart>
  );
};

export default LineChart;
