import React from "react";
import { Area, Tooltip } from "recharts";
import ComposedChart from "../composedChart/ComposedChart";
import { colorProcessor, gradientColors } from "../../../utils/chartDataUtil";
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
}) => {
  const { tooltip: isTooltip } = mark;
  const { scale } = colorAxis;
  const stacked = colorAxis.field ? { stackId: "stacked " } : "";
  console.log("sets", sets);
  console.log("data", data);

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
      {gradientColors(sets, scale, colors)}
      {[...sets].map((key, index) => {
        let fillColor = colorProcessor(key, index, scale, colors);
        return (
          <Area
            dataKey={key}
            key={`area_${key}_${index}`}
            fill={`url(#Gradient_${index})`}
            fillOpacity={1}
            stroke={fillColor}
            {...stacked}
          />
        );
      })}
    </ComposedChart>
  );
};

export default AreaChart;
