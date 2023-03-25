const font = fetch(
  "'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;700&display=swap'"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!font && !css) {
  return "Loading";
}

const Theme = styled.div`
    font-family: 'Source Code Pro', monospace;
    ${font}
    ${css}
`;
return <Theme>{props.children}</Theme>;
