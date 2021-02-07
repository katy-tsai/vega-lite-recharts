export const defaultTitle = {
  anchor: "start",
  align: "left",
  color: "#000",
  fontWeight: "bold",
};

export const defaultMark = {
  type: "line",
  tooltip: true,
  color: "#3BA0FF",
  point: {
    filled: true,
  },
};

export const defaultXAxis = {
  field: "date",
  type: "temporal",
  axis: {
    format: "%d",
    grid: true,
    title: null,
  },
};

export const defaultYAxis = {
  field: "value",
  type: "quantitative",
  axis: {
    grid: true,
    title: null,
  },
};

export const defaultColorAxis = {
  field: "color",
  type: "nominal",
  scale: {
    domain: [],
    range: [],
  },
};

export const getTitleObj = (title) => {
  if (title) {
    if (typeof title === "string") {
      return { ...defaultTitle, text: title };
    } else {
      return { ...defaultTitle, ...title };
    }
  }
  return null;
};

export const getMarkObj = (mark) => {
  if (mark) {
    if (typeof mark === "string") {
      return { ...defaultMark, type: mark };
    } else {
      return { ...defaultMark, ...mark };
    }
  }
  return null;
};

export const getChartType = (mark) => {
  if (mark) {
    if (mark === "point") {
      return "Scatter";
    }
    if (typeof mark === "string") {
      return upperCaseStr(mark);
    } else {
      return upperCaseStr(mark.type);
    }
  }
  return null;
};

export const upperCaseStr = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const getXAxis = (xAxis) => {
  if (xAxis) {
    if (typeof xAxis === "string") {
      xAxis = { field: xAxis };
    }
    xAxis = { ...defaultXAxis, ...xAxis };
    let { values: ticks, field: dataKey, type: vegaType, ...rest } = xAxis;
    let type = "category";
    if (vegaType === "quantitative") {
      type = "number";
    }
    return ticks
      ? { ticks, dataKey, type, vegaType, ...rest }
      : { dataKey, type, vegaType, ...rest };
  }
  return null;
};

export const getYAxis = (yAxis) => {
  if (yAxis) {
    if (typeof yAxis === "string") {
      yAxis = { field: yAxis };
    }
    yAxis = { ...defaultYAxis, ...yAxis };
    let { values: ticks, field: dataKey, type: vegaType, ...rest } = yAxis;
    let type = "category";
    if (vegaType === "quantitative") {
      type = "number";
    }
    return ticks
      ? { ticks, dataKey, type, vegaType, ...rest }
      : { dataKey, type, vegaType, ...rest };
  }
  return null;
};

export const getColorAxis = (colorAxis) => {
  if (colorAxis) {
    if (typeof colorAxis === "string") {
      colorAxis = { field: colorAxis };
    }
    colorAxis = { ...defaultColorAxis, ...colorAxis };
    return { ...colorAxis };
  }
  return null;
};

export const parseSpec = (spec) => {
  return {
    chartType: getChartType(spec.mark),
    title: getTitleObj(spec.title),
    mark: getMarkObj(spec.mark),
    encoding: spec.encoding,
    xAxis: getXAxis(spec.encoding.x),
    yAxis: getYAxis(spec.encoding.y),
    colorAxis: getColorAxis(spec.encoding.color),
  };
};
