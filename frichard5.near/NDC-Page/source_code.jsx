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
    font-weight: 600;
    margin-left: -20px;
    font-size: 26px;
  }
  padding: 28px;
  background-size: contain;
  background-repeat: no-repeat;
  ${avenirFontFamily}
  button {
    margin-left: 10px;
    color: black;
    background:rgba(255, 213, 13, 0.5);
    border: none;
    &:hover {
      background:rgba(255, 213, 13, 1);
      color: black;
    }
    &:active {
        background-color:rgba(255, 213, 13, 0.8);
        color: black !important;
    }
  }
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(81, 81, 81, 0.3);
    border-radius: 3px;
  }

  
  *::-webkit-scrollbar-thumb:hover {
    background: rgba(81, 81, 81, 0.5);;
  }

  *::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

const Banner = <Widget src={`${widgetProvider}/widget/NDC-Banner`} />;

const DashBoard = (
  <Widget
    src={`${widgetProvider}/widget/NDC-Dashboard`}
    props={{ widgetProvider }}
  />
);

return (
  <DashboardContainer theme={theme}>
    {Banner}
    {DashBoard}
  </DashboardContainer>
);
