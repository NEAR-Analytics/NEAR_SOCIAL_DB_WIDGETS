const style = {
  width: "100%",
  height: "auto",
};

const src = [
  "https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true",
  "amount=0.01",
  "amountFiat=10",
  "backgroundColor=000000",
  "darkMode=true",
  "from=btc",
  "fromFiat=near",
  "horizontal=false",
  "isFiat",
  "lang=en-US",
  "link_id=1d6ee7c89db3c7&locales=false",
  "logo=false",
  "primaryColor=00C26F",
  "to=near",
  "toFiat=usd",
  "toTheMoon=true",
].join("&");

return (
  <iframe
    className="container-fluid vh-100 border border-primary rounded"
    id="changenow-iframe-widget"
    {...{ src, style }}
  />
);
