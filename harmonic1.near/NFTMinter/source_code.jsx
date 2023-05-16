const nearContract = "nft.harmonic1.near";
let accountId = context.accountId;

const handleMint = () => {
  console.log("it's here", state.title && state.description && state.image.cid);
  if (!(state.title && state.description && state.image.cid)) {
    console.log("not working");
    return;
  }
  //if (state.selectedChain == "0") {
  const gas = 200000000000000;
  const deposit = 10000000000000000000000;
  const metadata = {
    name: state.title,
    description: state.description,
    properties: [],
    image: `ipfs://${state.image.cid}`,
  };
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: metadata,
  }).then((res) => {
    const cid = res.body.cid;
    const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
    console.log("in the promise", res, Id);
    Near.call([
      {
        contractName: nearContract,
        methodName: "nft_mint",
        args: {
          token_id: `${Date.now()}`,
          token_metadata: {
            title: state.title,
            description: state.description,
            media: `https://ipfs.io/ipfs/${state.image.cid}`,
            reference: `ipfs://${cid}`,
          },
          receiver_id: accountId,
        },
        gas: gas,
        deposit: deposit,
      },
    ]);
  });
  return;
  //}
  console.log("passed checks");
};

State.init({
  title: "",
  description: "",
});

const onChangeTitle = (title) => {
  State.update({
    title,
  });
};

const onChangeDesc = (description) => {
  console.log("Log critcal critics:", state.selectedChain, state.title);
  State.update({
    description,
  });
};

const containerStyle = {
  maxWidth: "500px",
  margin: "0 auto",
  padding: "2rem",
  backgroundColor: "#f5f5f5",
};

const headerStyle = {
  fontSize: "2rem",
  marginBottom: "1rem",
  color: "black",
  fontWeight: "bold",
};

const formFieldStyle = {
  marginBottom: "1.5rem",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "0.5rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "0.3rem",
  fontSize: "1rem",
};

const previewContainerStyle = {
  marginTop: "1.5rem",
};

const previewImageStyle = {
  maxWidth: "100%",
  height: "auto",
  marginTop: "0.5rem",
};

const buttonStyle = {
  display: "inline-block",
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  textAlign: "center",
  textDecoration: "none",
  cursor: "pointer",
  borderRadius: "0.3rem",
};

const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "transparent",
  color: "#6c757d",
  border: "1px solid #6c757d",
};

return (
  <div style={containerStyle}>
    <div style={headerStyle}>Mint an NFT on Harmonic</div>
    <div style={formFieldStyle}>
      <label style={labelStyle} htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        style={inputStyle}
      />
    </div>
    <div style={formFieldStyle}>
      <label style={labelStyle} htmlFor="description">
        Description
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => onChangeDesc(e.target.value)}
        style={inputStyle}
      />
    </div>
    <div style={formFieldStyle}>
      <IpfsImageUpload
        image={state.image}
        className="my-2 btn btn-outline-secondary border-1 rounded-3"
        onImageChange={setImage}
      />
    </div>
    {state.image.cid && (
      <div style={previewContainerStyle}>
        <h5>Preview</h5>
        <img
          src={`https://ipfs.io/ipfs/${state.image.cid}`}
          alt="Preview"
          style={previewImageStyle}
        />
      </div>
    )}
    <div style={formFieldStyle}>
      <button
        type="button"
        className="btn btn-primary my-3 px-4"
        onClick={handleMint}
        style={primaryButtonStyle}
      >
        Mint
      </button>
    </div>
  </div>
);
