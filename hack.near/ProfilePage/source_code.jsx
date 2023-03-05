const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/ProfileLarge"
        props={{
          sender,
          profile,
          link: true,
        }}
      />
    </div>
  </div>
);
