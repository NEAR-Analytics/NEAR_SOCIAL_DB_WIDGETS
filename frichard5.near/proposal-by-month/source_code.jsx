const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const widgetUrl = `https://api.pikespeak.ai/widgets/dao/${account}`;

return (
  <>
    <iframe style={{ width: "100%", height: "440px" }} src={widgetUrl}></iframe>
  </>
);
