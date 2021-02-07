import React from "react";
import dayjs from "dayjs";
export const chartDataGenerate = (data, spec) => {
  const { chartType, colorAxis, xAxis, yAxis } = spec;
  if (chartType === "arc") {
    return { chartdata: data };
  }
  const sets = new Set();
  const axisX = xAxis.dataKey;
  const axisY = yAxis.dataKey;
  let chartdata = data;
  if (colorAxis) {
    const axisColor = colorAxis.field;
    chartdata = data.reduce((pre, cur) => {
      var occurs = pre.reduce(function (n, item, i) {
        return item[axisX] === cur[axisX] ? i : n;
      }, -1);

      if (occurs >= 0) {
        pre[occurs] = { ...pre[occurs], [cur[axisColor]]: cur[axisY] };
      } else {
        pre.push({ [axisX]: cur[axisX], [cur[axisColor]]: cur[axisY] });
      }
      sets.add(cur[axisColor]);
      return pre;
    }, []);
  } else {
    if (
      chartType === "bar" &&
      xAxis.type === "number" &&
      yAxis.type === "category"
    ) {
      sets.add(axisY);
    } else {
      sets.add(axisX);
    }
  }

  return { chartdata, sets };
};

export const colorProcessor = (key, index, scale, colors) => {
  const { domain, range } = scale;
  let colorArray = [...range, ...colors];
  if (domain && range && domain.length > 0 && range.length > 0) {
    let i = domain.findIndex((value) => value === key);
    if (i >= 0) {
      return range[i];
    }
  } else {
    return colorArray[index % colorArray.length];
  }
};

export const gradientColors = (sets, scale, colors) => {
  return [...sets].map((key, index) => {
    const color = colorProcessor(key, index, scale, colors);
    return (
      <defs key={`Gradient_${index}`}>
        <linearGradient id={`Gradient_${index}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={1} />
          <stop offset="95%" stopColor={color} stopOpacity={0.3} />
        </linearGradient>
      </defs>
    );
  });
};

export const getAxisProps = ({ axisType, option, data }) => {
  const { dataKey, axis, type, vegaType, title } = option;
  const { values: ticks, format } = axis;
  let props = { type: "category" };
  if (type) {
    props = { ...props, type };
  }
  if (Object.keys(data[0]).includes(dataKey)) {
    props = { ...props, dataKey };
  }
  if (ticks && ticks.length > 0) {
    props = { ...props, ticks: [...ticks] };
  }
  if (title) {
    props = { ...props, label: { value: title } };
  }
  if (vegaType === "temporal" && format) {
    console.log("format", format);

    props = {
      ...props,
      tickFormatter: (value) => {
        //TODO:
        return dayjs(value).format("D");
      },
    };
  }
  if (axisType === "xAxis" && vegaType === "nominal") {
    props = {
      ...props,
      padding: { left: 10, right: 10 },
    };
  }

  return { ...props };
};
