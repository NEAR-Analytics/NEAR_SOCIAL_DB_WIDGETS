//import React from "react";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", // Full viewport height
  backgroundColor: "#fff", // White background
};

const heroStyles = {
  fontSize: "4em",
  textAlign: "center",
  color: "#000", // Black color
};

const blueTextStyles = {
  color: "#0000FF", // Blue color
};

const paragraphStyles = {
  fontSize: "2em",
  textAlign: "center",
  color: "#000", // Black color
  marginTop: "20px",
};

//const App = () => {
return (
  <div style={containerStyles}>
    <h1 style={heroStyles}>
      <span>Welcome to </span>
      <span style={blueTextStyles}>Harmonic Guild</span>
      <span>Gateway</span>
    </h1>
    <p style={paragraphStyles}>Stay tuned for more exciting things.</p>
  </div>
);
//};

//export default App;
