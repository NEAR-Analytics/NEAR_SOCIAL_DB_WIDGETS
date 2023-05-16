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

const paragraphStyles2 = {
  fontSize: "1em",
  textAlign: "center",
  color: "#000", // Black color
  marginTop: "20px",
};

//const App = () => {
return (
  <div>
    <div style={containerStyles}>
      <h1 style={heroStyles}>
        <span>Welcome to </span>
        <span style={blueTextStyles}>Harmonic Guild</span>
        <span>Gateway</span>
      </h1>
      <p style={paragraphStyles}>
        Check our latest Apps below and Stay Tuned for more.
      </p>
    </div>
    <div className="mb-5">
      <Widget src="harmonic1.near/widget/NFTMinter" />
      <div className="my-3">
        <Widget src="harmonic1.near/widget/NFTViewer" />
      </div>

      <p className="mt-5" style={paragraphStyles2}>
        Contact us at hello@harmonicguild.io to get a trial account to use our
        Minter for free. No passphrase, no crypto needed.
      </p>
    </div>
  </div>
);
//};

//export default App;
