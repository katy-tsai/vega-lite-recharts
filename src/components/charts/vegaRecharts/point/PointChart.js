import React from "react";
import { Scatter, Tooltip, Legend } from "recharts";
import ComposedChart from "../composedChart/ComposedChart";
import { colorProcessor } from "../../../utils/chartDataUtil";
import PointLegend from './PointLegend';
const pointColors = [
  "#da9708",
  "#5e35b1",
  "#e91e63",
  "#fbc02d",
  "#2962ff",
  "#e65100",
  "#00897b",
]
const PointChart = ({
  data,
  sets,
  xAxis,
  yAxis,
  colorAxis,
  sizeAxis,
  mark,
  colors = pointColors,
  width,
  height,
  xAxisLine,
  yAxisLine,
  chartMargin,
  isLegend
}) => {
  const { tooltip: isTooltip } = mark;
  const { scale, field } = colorAxis || {};
  let showColorLegend = field ? true : false;
  if (isLegend != undefined) {
    showColorLegend = isLegend;
  }

  return <ComposedChart
    data={data}
    chartType={"Scatter"}
    xAxis={xAxis}
    yAxis={yAxis}
    sizeAxis={sizeAxis}
    width={width}
    height={height}
    xAxisLine={xAxisLine}
    yAxisLine={yAxisLine}
    chartMargin={chartMargin}
  >
    {isTooltip ? <Tooltip /> : ""}
    {[...sets].map((key, index) => {
      let fillColor = colorProcessor(key, index, scale, colors, mark);

      return (
        <Scatter
          key={`point_${key}_${index}`}
          name={key}
          dataKey={key}
          fill={"#fff"}
          stroke={fillColor}
        />
      );
    })}
    {showColorLegend && <Legend content={<PointLegend />} sizeAxis={sizeAxis} iconType="circle" iconSize={10} data={data} />}
  </ComposedChart>;
};

export default PointChart;
