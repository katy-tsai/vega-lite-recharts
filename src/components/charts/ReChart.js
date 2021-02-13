import React from "react";
import { useResizeDetector } from "react-resize-detector";
import { parseSpec } from "../utils/chartSpceUtil";
import { chartDataGenerate } from "../utils/chartDataUtil";
import * as charts from "./vegaRecharts/index";
import VegaChart from './vegaCharts/VegaChart';

const ReChart = ({ data, spec, className, xAxisLine = true, yAxisLine = true, isLegend, chartMargin, isVegaChart = false }) => {
  const { width, height, ref } = useResizeDetector();
  const chartSpec = parseSpec(spec);
  const { title, mark, encoding, chartType, ...rest } = chartSpec;
  const { chartdata, sets } = chartDataGenerate(data, chartSpec);
  console.log(title);
  const ChartTag = charts[`${chartType}Chart`]
    ? charts[`${chartType}Chart`]
    : null;
  let showVegaChart = isVegaChart;
  if (!isVegaChart) {
    showVegaChart = ChartTag ? false : true;
  }

  return showVegaChart ? <VegaChart data={data} spec={spec} width={width} height={height} /> : (
    <div className={["rechart-wapper-div", className].join(" ")} ref={ref}>
      {title && (
        <div className={["rechart-title", title.anchor].join(" ")}>
          {title.text}
        </div>
      )}
      {ChartTag && (
        <ChartTag
          data={chartdata}
          sets={sets}
          mark={mark}
          width={width}
          height={height - 30}
          chartType={chartType}
          encoding={encoding}
          xAxisLine={xAxisLine}
          yAxisLine={yAxisLine}
          isLegend={isLegend}
          chartMargin={chartMargin}
          {...rest}
        />
      )}
    </div>
  );
};

export default ReChart;
