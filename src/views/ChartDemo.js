import React from "react";
import Rechart from "../components/charts/ReChart";
import lineData from "../_demo/data/lineData.json";
import lineSpec from "../_demo/spec/line.spec.json";
import areaData from "../_demo/data/areaData.json";
import areaSpec from "../_demo/spec/area.spec.json";
import barData from '../_demo/data/barData.json';
import barSpec from '../_demo/spec/bar.spec.json';
import bar2Data from '../_demo/data/bar2Data.json';
import barColumnSpec from '../_demo/spec/barColumn.spec.json';
import barSteadSpec from '../_demo/spec/barStead.spec.json';
import barhData from '../_demo/data/barhData.json';
import barhSpec from '../_demo/spec/barh.spec';
import arcData from '../_demo/data/arcData.json';
import arcSpec from '../_demo/spec/arc.spec.json';
import dountData from '../_demo/data/dountData.json';
import dountSpec from '../_demo/spec/donut.spec.json';
import carData from '../_demo/data/car.json';
import pointSpec from '../_demo/spec/point.spec.json';
import pointSzieSec from '../_demo/spec/pointSize.spec.json';
const ChartDemo = () => {
  return (
    <>
      <div className="chart-demo-div">
        <Rechart data={carData} spec={pointSzieSec} />
      </div>
      {/* <div className="chart-demo-div">
        <Rechart data={carData} spec={pointSpec} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={dountData} spec={dountSpec} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={arcData} spec={arcSpec} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={barhData} spec={barhSpec} chartMargin={{ left: 30 }} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={bar2Data} spec={barSteadSpec} isLegend={false} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={bar2Data} spec={barColumnSpec} yAxisLine={false} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={barData} spec={barSpec} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={lineData} spec={lineSpec} />
      </div>
      <div className="chart-demo-div">
        <Rechart data={areaData} spec={areaSpec} />
      </div> */}

    </>
  );
};

export default ChartDemo;
