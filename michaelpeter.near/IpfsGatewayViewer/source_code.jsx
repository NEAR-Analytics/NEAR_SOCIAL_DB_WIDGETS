State.init({ gateway: 0, cid: "" });

const gateways = [
  {
    name: "ipfs.io",
    path: "https://ipfs.io/ipfs/<cid>",
  },
  {
    name: "dweb.link",
    path: "https://dweb.link/ipfs/<cid>",
  },
  {
    name: "web3.storage",
    path: "https://w3s.link/ipfs/<cid>",
  },
  {
    name: "Cloudflare",
    path: "https://cloudflare-ipfs.com/ipfs/<cid>",
  },
];

// TODO replace buttons with radios for accessibility
// once radios work in VM
return (
  <div
    className="d-flex flex-column gap-2 w-100"
    style={{ height: "100rem", maxHeight: "100%" }}
  >
    <div className="d-flex flex-row justify-content-center gap-2">
      {gateways.map((g, i) => {
        return (
          <button
            className={`btn${state.gateway === i ? " btn-success" : ""}`}
            key={g.name}
            onClick={() => {
              State.update({ gateway: i });
            }}
          >
            {g.name}
          </button>
        );
      })}
    </div>

    <div className="d-flex flex-row">
      <input
        placeholder="CID"
        value={state.cid}
        onChange={(e) => State.update({ cid: e.target.value })}
      />
      <button
        style={{ width: "3rem" }}
        className="btn"
        onClick={() => State.update({ cid: "" })}
      >
        <i className="bi bi-x" />
      </button>
    </div>
    {state.cid && (
      <>
        <div style={{ display: "flex", flexGrow: 1 }}>
          <iframe
            style={{ width: "100%", height: "100%" }}
            src={gateways[state.gateway].path.replace("<cid>", state.cid)}
          />
        </div>
        <div className="d-flex flex-row justify-content-end">
          <a href={gateways[state.gateway].path.replace("<cid>", state.cid)}>
            Open <i className="bi bi-box-arrow-up-right" />
          </a>
        </div>
      </>
    )}
  </div>
);
