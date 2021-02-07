import React from "react";
import Rechart from "../components/charts/ReChart";
import lineData from "../_demo/data/lineData.json";
import lineSpec from "../_demo/spec/line.spec.json";
import areaData from "../_demo/data/areaData.json";
import areaSpec from "../_demo/spec/area.spec.json";
const ChartDemo = () => {
  return (
    <>
      <div className="chart-demo-div">
        <Rechart data={lineData} spec={lineSpec} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={areaData} spec={areaSpec} />
      </div>
    </>
  );
};

export default ChartDemo;
