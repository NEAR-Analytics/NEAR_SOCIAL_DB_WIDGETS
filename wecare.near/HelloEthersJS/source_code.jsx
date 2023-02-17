const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "Please login first";

return <p>Account: {sender}</p>;
