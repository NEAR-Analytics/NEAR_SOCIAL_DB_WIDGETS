const token = props.token;

return (
  <div>
    <img src={token.logoURI} style={{ maxHeight: "2em" }} />
    {token.name}: {token.address}
  </div>
);
