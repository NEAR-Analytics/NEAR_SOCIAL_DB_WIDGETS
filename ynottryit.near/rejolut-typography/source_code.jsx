const theme = {
  heading1: {
    fontSize: "3rem",
    lineHeight: "60px",
    semibold: {
      fontWeight: "600",
    },
    bold: {
      fontWeight: "700",
    },
    extrabold: {
      fontWeight: "800",
    },
  },
  heading2: {
    fontSize: "2.5rem",
    lineHeight: "54px",
    semibold: {
      fontWeight: "600",
    },
    bold: {
      fontWeight: "700",
    },
    extrabold: {
      fontWeight: "800",
    },
  },
  heading3: {
    fontSize: "2.25rem",
    lineHeight: "48px",
    semibold: {
      fontWeight: "600",
    },
    bold: {
      fontWeight: "700",
    },
    extrabold: {
      fontWeight: "700",
    },
  },
  heading4: {
    fontSize: "1.875rem",
    lineHeight: "42px",
    semibold: {
      fontWeight: "600",
    },
    bold: {
      fontWeight: "700",
    },
    extrabold: {
      fontWeight: "700",
    },
  },
  heading5: {
    fontSize: "1.5rem",
    lineHeight: "36px",
    semibold: {
      fontWeight: "600",
    },
    bold: {
      fontWeight: "700",
    },
    extrabold: {
      fontWeight: "700",
    },
  },
  heading6: {
    fontSize: "1.125rem",
    lineHeight: "24px",
    semibold: {
      fontWeight: "600",
    },
    bold: {
      fontWeight: "700",
    },
    extrabold: {
      fontWeight: "700",
    },
  },
  subHeading1: {
    fontSize: "1.25rem",
    lineHeight: "28px",
    semibold: {
      fontWeight: "500",
    },
    bold: {
      fontWeight: "600",
    },
    extrabold: {
      fontWeight: "700",
    },
  },
  subHeading2: {
    fontSize: "1.063rem",
    lineHeight: "25px",
    semibold: {
      fontWeight: "500",
    },
    bold: {
      fontWeight: "600",
    },
    extrabold: {
      fontWeight: "700",
    },
  },
  body1: {
    fontSize: "1rem",
    lineHeight: "24px",
    semibold: {
      fontWeight: "400",
    },
    bold: {
      fontWeight: "500",
    },
    extrabold: {
      fontWeight: "600",
    },
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: "20px",
    semibold: {
      fontWeight: "400",
    },
    bold: {
      fontWeight: "500",
    },
    extrabold: {
      fontWeight: "600",
    },
  },
  caption1: {
    fontSize: "0.875rem",
    lineHeight: "20px",
    semibold: {
      fontWeight: "400",
    },
    bold: {
      fontWeight: "500",
    },
    extrabold: {
      fontWeight: "600",
    },
  },
  caption2: {
    fontSize: "0.75rem",
    lineHeight: "16px",
    semibold: {
      fontWeight: "400",
    },
    bold: {
      fontWeight: "500",
    },
    extrabold: {
      fontWeight: "600",
    },
  },
  caption3: {
    fontSize: "0.75rem",
    lineHeight: "16px",
    semibold: {
      fontWeight: "400",
    },
    bold: {
      fontWeight: "500",
    },
    extrabold: {
      fontWeight: "600",
    },
  },
};

const variant = props.variant || "bold";
const type = props.type || "heading1";
const children = props.children || "Sample Text";
const color = props.color || "#323232";
const style = {
  fontWeight: theme[type][variant].fontWeight,
  fontSize: theme[type].fontSize,
  lineHeight: theme[type].fontSize,
  color: color,
};

switch (type) {
  case "heading1":
    return <h1 style={style}>{children}</h1>;
  case "heading2":
    return <h2 style={style}>{children}</h2>;
  case "heading3":
    return <h3 style={style}>{children}</h3>;
  case "heading4":
    return <h4 style={style}>{children}</h4>;
  case "heading5":
    return <h5 style={style}>{children}</h5>;
  case "heading6":
    return <h6 style={style}>{children}</h6>;
  case "subHeading1":
  case "subHeading2":
    return <h6 style={style}>{children}</h6>;
  case "body1":
  case "body2":
  case "caption1":
  case "caption2":
  case "caption3":
    return <p style={style}>{children}</p>;
  default:
    return null;
}
