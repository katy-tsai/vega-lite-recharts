import React from "react";
import { XAxis, YAxis, CartesianGrid } from "recharts";
import * as Charts from "recharts";
import { getAxisProps } from "../../../utils/chartDataUtil";

const ComposedChart = ({
  chartType,
  data,
  children,
  xAxis,
  yAxis,
  width,
  height,
}) => {
  const ChartsTag = Charts[`${chartType}Chart`]
    ? Charts[`${chartType}Chart`]
    : Charts[`ComposedChart`];
  const xAxisOptions = getAxisProps({ axisType: "xAxis", option: xAxis, data });
  const yAxisOptions = getAxisProps({ axisType: "yAxis", option: yAxis, data });
  console.log("xAxisOptions", xAxisOptions);
  console.log("yAxisOptions", yAxisOptions);
  return (
    <ChartsTag data={data} width={width} height={height}>
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={xAxis.axis.grid}
        horizontal={yAxis.axis.grid}
      />
      <XAxis {...xAxisOptions} />
      <YAxis {...yAxisOptions} />
      {children}
    </ChartsTag>
  );
};

export default ComposedChart;
