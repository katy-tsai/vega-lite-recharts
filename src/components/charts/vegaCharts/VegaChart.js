import React from "react";
import { VegaLite } from "react-vega";
import { ResponsiveContainer } from "recharts";
const VegaChart = ({ data, spec, actions = false, width, height }) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <VegaLite
        spec={{
          ...spec,
          data: { values: data },
        }}
        actions={actions}
      />
    </ResponsiveContainer>
  );
};

export default VegaChart;
