import React from "react";
import { Line, Tooltip } from "recharts";
import ComposedChart from "../composedChart/ComposedChart";
import { colorProcessor } from "../../../utils/chartDataUtil";

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
}) => {
  const { tooltip: isTooltip, point } = mark;
  const { scale } = colorAxis;

  return (
    <ComposedChart
      data={data}
      chartType={chartType}
      xAxis={xAxis}
      yAxis={yAxis}
      width={width}
      height={height}
    >
      {isTooltip ? <Tooltip /> : ""}
      {[...sets].map((key, index) => {
        let fillColor = colorProcessor(key, index, scale, colors);
        console.log("key", key);

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
    </ComposedChart>
  );
};

export default LineChart;
