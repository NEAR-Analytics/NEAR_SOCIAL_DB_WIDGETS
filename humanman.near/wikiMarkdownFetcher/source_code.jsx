const accountId = context.accountId;
const markdownContent = props.path
  ? `https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/${props.path}.md`
  : `# No Data`;

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

const res = props.path ? fetch(markdownContent) : "";
// const delimiter = "\n";
// const start = 4;
// const body = res.body.split(delimiter).slice(start).join("\n");
const body = res.length ? res.body : markdownContent;

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
);
