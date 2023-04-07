const widgetProvider = "frichard5.near";
// Style
const avenirFontFamily = fetch(
  "https://fonts.cdnfonts.com/css/avenir-lt-std"
).body;
const theme = {
  main: "#FFD50D",
  secondaryPink: "#F29BC0",
  secondaryBlue: "#4498E0",
};

//    background: ${(props) => props.theme.secondaryBlue};

const DashboardContainer = styled.div`
  * {
    font-family: 'avenir lt std';    
  }
  h2 {
    font-weight: 750;
  }
  padding: 28px;
  background-size: contain;
  background-repeat: no-repeat;
  ${avenirFontFamily}
`;

const Banner = <Widget src={`${widgetProvider}/widget/NDC-Banner`} />;

const DashBoard = <Widget src={`${widgetProvider}/widget/NDC-Dashboard`} />;

return <DashboardContainer theme={theme}>{Banner}</DashboardContainer>;
