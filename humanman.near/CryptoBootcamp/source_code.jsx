const accountId = context.accountId;
State.init({
  text: initialText,
});
const api =
  "https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/01_history/1.2_history-of-money.md";
if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

const moduleArr = [
  {
    title: "1.1 The History of the Internet",
    path: "01_history/1.1_history-of-the-internet",
  },
  {
    title: "1.2 The History of Money",
    path: "01_history/1.2_history-of-money",
  },
  {
    title: "1.3 The History of Crypto",
    path: "01_history/1.2_history-of-crypto",
  },
];

const res = fetch(api);
const delimiter = "\n";
const start = 4;
const body = res.body;
// const body = res.body.split(delimiter).slice(start).join("\n");

if (context.loading) {
  return "Loading";
}

return (
  <div>
    <div>
      {moduleArr.map((obj) => {
        <Widget
          src="humanman.near/widget/wikiMarkdownFetcher"
          props={{ path }}
        />;
      })}
    </div>
  </div>
);
