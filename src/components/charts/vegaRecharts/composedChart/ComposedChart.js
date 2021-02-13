import React from "react";
import { XAxis, YAxis, ZAxis, CartesianGrid, Label } from "recharts";
import * as Charts from "recharts";
import { getAxisProps, getZaxisProps } from "../../../utils/chartDataUtil";
const defaultMargin = { top: 5, right: 5, bottom: 5, left: 5 };
const ComposedChart = ({
  chartType,
  data,
  children,
  xAxis,
  yAxis,
  sizeAxis,
  width,
  height,
  xAxisLine,
  yAxisLine,
  chartMargin
}) => {
  const ChartsTag = Charts[`${chartType}Chart`]
    ? Charts[`${chartType}Chart`]
    : Charts[`ComposedChart`];
  const xAxisOptions = getAxisProps({ axisType: "xAxis", option: xAxis, data, chartType });
  const yAxisOptions = getAxisProps({ axisType: "yAxis", option: yAxis, data, chartType });
  const zAxisOptions = getZaxisProps({ option: sizeAxis, data, chartType });

  console.log('zAxisOptions', zAxisOptions);
  let layout = (
    chartType === "Bar" &&
    xAxis.type === "number" &&
    yAxis.type === "category"
  ) ? { layout: 'vertical' } : {};
  const margin = { ...defaultMargin, ...chartMargin };
  const { title: xLabe } = xAxis.axis;
  const { title: yLabe } = yAxis.axis;

  return (
    <ChartsTag data={data} width={width} height={height} {...layout} margin={margin}>
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={xAxis.axis.grid}
        horizontal={yAxis.axis.grid}
      />
      <XAxis {...xAxisOptions} axisLine={xAxisLine} >
        {xLabe && <Label value={xLabe} offset={-2} position="insideBottomRight" />}
      </XAxis>
      <YAxis {...yAxisOptions} axisLine={yAxisLine} >
        {yLabe && <Label value={yLabe} angle={-90} offset={-3} position="insideLeft" />}
      </YAxis>
      { zAxisOptions && <ZAxis {...zAxisOptions} />}
      {children}
    </ChartsTag>
  );
};

export default ComposedChart;
