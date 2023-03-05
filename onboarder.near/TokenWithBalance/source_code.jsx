const token = props.token;
const network = props.network;
const api = "";

switch (network) {
  case "ethereum":
    api = "";
    break;
  case "polygon":
    api = "";
    break;
  case "avalanche":
    api = "";
    break;
  case "aurora":
    api = "";
    break;
  default:
    api = "";
    break;
}

const price = 0; // add price later with open api and then add to div

return (
  <div>
    <img src={token.logoURI} style={{ maxHeight: "2em" }} />
    {token.name}: {token.address} PRICE:
  </div>
);
