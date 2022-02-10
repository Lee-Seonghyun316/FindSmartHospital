const color = {
  lightOrange: "#ffa24c",
  orange: "#f27119",
  darkOrange: "#b84200",
  lightYellow: "#ffbf04",
  yellow: "#fff14f",
  darkYellow: "#c78f00",
  white: "#fff",
  black: "#020202",
};

const deviceSizes = {
  mobile: "375px",
  tablet: "768px",
  laptop: "1024px",
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

export const theme = {
  color,
  device,
};
