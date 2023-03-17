const accountId = context.accountId;
const api =
  "https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/01_history/1.2_history-of-money.md";
if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

function parseName(accountId) {
  const name = accountId.split(/.near/)[0];
  console.log(name);
  return name;
}
const nameParam = parseName(accountId);
const res = fetch(api);
const delimiter = "\n";
const start = 4;
const body = res.body.split(delimiter).slice(start).join("\n");

if (context.loading) {
  return "Loading";
}

return (
  <div>
    <Markdown
      text={body}
      transformImageUri={(uri) =>
        uri.startsWith("http")
          ? uri
          : `https://github.com/near/wiki/blob/master/website/static/img/bootcamp/${uri.slice(
              26
            )}`
      }
    />
  </div>
);
