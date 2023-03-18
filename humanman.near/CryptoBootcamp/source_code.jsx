const accountId = context.accountId;
State.init({
  text: initialText,
  path: "01_history/1.1_history-of-the-internet",
  content: "",
});

const markdownContent = `https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/${state.path}.md`;
console.log(markdownContent);
if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

const res = fetch(state.path);
const delimiter = "\n";
const start = 4;
const body = res.body.split(delimiter).slice(start).join("\n");

State.update({ content: res.body });

if (context.loading) {
  return "Loading";
}

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
    path: "01_history/1.2_history-of-crypto",
  },
];

const handleModuleSelect = (val) => {
  const m = fetch(
    `https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/${val}.md`
  );
  State.update({ path: val, content: m });
};

if (context.loading) {
  return "Loading";
}

return (
  <Markdown
    text={body}
    transformImageUri={(uri) =>
      uri.startsWith("http")
        ? uri
        : `https://cryptobootcampassets.s3.amazonaws.com/${uri.slice(26)}`
    }
  />
  //   <div>
  // {moduleArr.map((obj, index) => (
  //   <div style={{ marginBottom: "5px" }}>
  //     <button onClick={() => handleModuleSelect(obj.path)} key={index}>
  //       {obj.label}
  //     </button>
  //   </div>
  // ))}

  //   </div>
);
// {moduleArr.map((obj) => {
//   <div>
//     hello //{" "}
//     <button onClick={handleModuleSelect(obj.path)}>{obj.label}</button>
//   </div>;
// })}
