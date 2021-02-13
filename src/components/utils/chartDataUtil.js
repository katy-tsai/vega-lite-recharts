import React from "react";
import dayjs from "dayjs";
export const chartDataGenerate = (data, spec) => {
  const { chartType, colorAxis, xAxis, yAxis, column } = spec;
  console.log('column', column);
  if (chartType === 'Arc') {
    return { chartdata: data };
  }
  const sets = new Set();
  let axisX = xAxis.dataKey;
  let axisY = yAxis.dataKey;
  let chartdata = data;
  if (colorAxis) {
    let axisColor = colorAxis.field;

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
      chartType === "Bar" &&
      xAxis.type === "number" &&
      yAxis.type === "category"
    ) {
      sets.add(axisX);
    } else {
      sets.add(axisY);
    }
  }

  return { chartdata, sets };
};

export const colorProcessor = (key, index, scale, colors, mark) => {
  if (mark && mark.color) {
    colors = [mark.color, ...colors];
  }
  if (!scale) {
    return colors[index % colors.length];
  }
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

export const gradientColors = (sets, scale, colors, mark) => {
  return [...sets].map((key, index) => {
    const color = colorProcessor(key, index, scale, colors, mark);
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

export const getZaxisProps = ({ option, data, chartType }) => {
  if (option) {
    const { dataKey, type, scale } = option;
    let { range, domain } = scale;
    if (!domain) {
      domain = [0, Math.max.apply(
        null,
        data.map((entry) => entry[dataKey])
      )];
    }
    return { dataKey, type, range, domain }
  }
  return null;
}

export const getAxisProps = ({ axisType, option, data, chartType }) => {
  const { dataKey, axis, type, vegaType, title } = option;
  const { values: ticks, format } = axis;
  let props = { type: "category" };
  if (type) {
    props = { ...props, type };
  }
  console.log(chartType, axisType, dataKey);
  console.log(Object.keys(data[0]));
  if (Object.keys(data[0]).includes(dataKey)) {
    console.log(chartType, axisType, type);
    if (chartType === 'Bar' && axisType === "xAxis" && type === 'number') {
      props = { ...props }
    } else {
      props = { ...props, dataKey };
    }

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
