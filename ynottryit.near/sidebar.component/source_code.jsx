const sidebar = {
  vmenuwrap: {
    backgroundColor: "rgb(35, 29, 75)",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "260px",
  },
  ul: {
    margin: "0",
    listStyleType: "none",
    padding: "0",
  },
  li: {
    margin: "0px 0",
    boxSizing: "border-box",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  a: {
    color: "#fff",
    fontSize: "16px",
    padding: "16px 16px",
    lineHeight: "normal",
    display: "block",
  },
  active: {
    color: "#fff",
    fontSize: "16px",
    padding: "16px 16px",
    lineHeight: "normal",
    display: "block",
    backgroundColor: "rgb(27 23 60)",
  },
  logodiv: {
    padding: "16px",
    display: "block",
    textAlign: "center",
  },
  logo: {
    fontSize: "30px",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
};
return (
  <>
    <div style={sidebar.vmenuwrap}>
      <div style={sidebar.logodiv}>
        <a href="#" style={sidebar.logo}>
          Logo
        </a>
      </div>
      <ul style={sidebar.ul}>
        <li style={sidebar.li}>
          <a href="#" style={sidebar.active}>
            Home
          </a>
        </li>
        <li style={sidebar.li}>
          <a href="https://docs.near.org/" target="_blank" style={sidebar.a}>
            About Us
          </a>
        </li>
        <li style={sidebar.li}>
          <a href="#" style={sidebar.a}>
            Products
          </a>
        </li>
        <li style={sidebar.li}>
          <a href="#" style={sidebar.a}>
            Blog
          </a>
        </li>
        <li style={sidebar.li}>
          <a href="#" style={sidebar.a}>
            Testimonials
          </a>
        </li>
        <li style={sidebar.li}>
          <a href="#" style={sidebar.a}>
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  </>
);
