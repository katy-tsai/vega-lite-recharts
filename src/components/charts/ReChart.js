import React from "react";
import { useResizeDetector } from "react-resize-detector";
import { parseSpec } from "../utils/chartSpceUtil";
import { chartDataGenerate } from "../utils/chartDataUtil";
import * as charts from "./vegaRecharts/index";

const ReChart = ({ data, spec, className }) => {
  const { width, height, ref } = useResizeDetector();
  spec = parseSpec(spec);
  const { title, mark, encoding, chartType, ...rest } = spec;
  const { chartdata, sets } = chartDataGenerate(data, spec);
  const ChartTag = charts[`${chartType}Chart`]
    ? charts[`${chartType}Chart`]
    : null;

  return (
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
          {...rest}
        />
      )}
    </div>
  );
};

export default ReChart;
