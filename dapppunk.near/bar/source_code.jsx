const menustyles = {
  menuwrap: {
    backgroundColor: "rgb(35, 29, 75)",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ul: {
    margin: "0",
    listStyleType: "none",
    display: "flex",
    padding: "0",
  },
  li: {
    margin: "0px 10px",
    boxSizing: "border-box",
  },
  a: {
    color: "#fff",
    fontSize: "16px",
    padding: "0px 16px",
    lineHeight: "normal",
  },
};
return (
  <>
    <div style={menustyles.menuwrap}>
      <ul style={menustyles.ul}>
        <li style={menustyles.li}>
          <a href="#" style={menustyles.a}>
            Home
          </a>
        </li>
        <li style={menustyles.li}>
          <a href="https://docs.near.org/" target="_blank" style={menustyles.a}>
            About Us
          </a>
        </li>
        <li style={menustyles.li}>
          <a href="#" style={menustyles.a}>
            Products
          </a>
        </li>
        <li style={menustyles.li}>
          <a href="#" style={menustyles.a}>
            Blog
          </a>
        </li>
        <li style={menustyles.li}>
          <a href="#" style={menustyles.a}>
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  </>
);
