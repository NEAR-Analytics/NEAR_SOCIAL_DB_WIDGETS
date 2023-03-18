const accountId = context.accountId;
const initalPath = `01_history/1.1_history-of-the-internet`;
const initialUrl = `https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/01_history/1.1_history-of-the-internet.md`;

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

const res = fetch(initialUrl);
const delimiter = "\n";
const start = 4;
const body = res.body.split(delimiter).slice(start).join("\n");

State.init({
  content: body,
});

const moduleArr = [
  {
    label: "1.1 The History of the Internet",
    path: "01_history/1.1_history-of-the-internet",
  },
  {
    label: "1.2 The History of Money",
    path: "01_history/1.2_history-of-money",
  },
  {
    label: "1.3 The History of Crypto",
    path: "01_history/1.3_history-of-crypto",
  },
];

const handleModuleSelect = (val) => {
  const url = `https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/${val}.md`;
  const fetched = fetch(url);
  const m = fetched.body.split(delimiter).slice(start).join("\n");
  State.update({ path: val, content: m });
};

if (context.loading) {
  return "Loading";
}

return (
  <div>
    {moduleArr.map((obj, index) => (
      <div style={{ marginBottom: "5px" }}>
        <button onClick={() => handleModuleSelect(obj.path)} key={index}>
          {obj.label}
        </button>
      </div>
    ))}
    <br />
    <br />
    <Markdown
      text={state.content}
      transformImageUri={(uri) =>
        uri.startsWith("http")
          ? uri
          : `https://cryptobootcampassets.s3.amazonaws.com/${uri.slice(26)}`
      }
    />
  </div>
);
