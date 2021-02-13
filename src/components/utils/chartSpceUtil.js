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
  type: "nominal",
  axis: {
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
  type: "category",
  scale: {
    domain: [],
    range: [],
  },
};

export const defaultTheta = {
  field: "theta",
  type: "quantitative"
}

export const defaultOpacity = {
  "value": 1
}

export const defaultSizeAxis = {
  field: "size",
  type: "quantitative",
  scale: {
    range: [
      16,
      255
    ]
  }

}

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

export const getXAxis = (xAxis, column) => {
  if (xAxis) {
    if (typeof xAxis === "string") {
      xAxis = { field: xAxis };
    }
    if (column) {
      xAxis = { ...xAxis, field: column.field, type: column.type };
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

export const getSizeAxis = (sizeAxis) => {
  if (sizeAxis) {
    if (typeof sizeAxis === "string") {
      sizeAxis = { field: sizeAxis };
    }
    sizeAxis = { ...defaultSizeAxis, ...sizeAxis };
    let { values: ticks, field: dataKey, type: vegaType, ...rest } = sizeAxis;
    let type = "category";
    if (vegaType === "quantitative") {
      type = "number";
    }
    return { dataKey, type, vegaType, ...rest };
  }
  return null;
}

export const getOpacity = (opacity) => {
  if (opacity) {
    if (typeof opacity === "string") {
      opacity = { value: opacity };
    }
    return { ...defaultOpacity, ...opacity };
  }
  return { ...defaultOpacity }
}
export const getColumn = (column) => {
  if (column) {
    return { ...column }
  }
  return null;
}
export const getThetaAxis = (theta) => {
  if (theta) {
    if (typeof theta === "string") {
      theta = { field: theta };
    }
    return { ...defaultTheta, ...theta };
  }
  return null;
}
export const parseSpec = (spec) => {
  return {
    chartType: getChartType(spec.mark),
    title: getTitleObj(spec.title),
    mark: getMarkObj(spec.mark),
    encoding: spec.encoding,
    xAxis: getXAxis(spec.encoding.x, spec.encoding.column),
    yAxis: getYAxis(spec.encoding.y),
    colorAxis: getColorAxis(spec.encoding.color),
    thetaAxis: getThetaAxis(spec.encoding.theta),
    sizeAxis: getSizeAxis(spec.encoding.size),
    opacity: getOpacity(spec.encoding.opacity),
    column: getColumn(spec.encoding.column)
  };
};
