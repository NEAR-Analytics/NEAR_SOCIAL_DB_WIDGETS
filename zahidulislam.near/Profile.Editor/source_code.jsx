const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const name = profile?.name;
const image = profile?.image;

const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
    : image?.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

if (profile === null) {
  return "Loading";
}

initState({
  profile: profile ?? {},
  linktree: profile.linktree ?? {},
  img: { cid: profile.image.ipfs_cid },
  description: profile.description ?? "",
  location: profile.location ?? "",
});

profile = {
  name: state.profile.name,
  image: {},
  linktree: state.linktree,
  description: state.description,
  location: state.location,
};

if (state.img.cid) {
  profile.image.ipfs_cid = state.img.cid;
} else if (state.profile.image.url) {
  profile.image.url = state.profile.image.url;
}

return (
  <div className="editor">
    <div className="inputContainer">
      <p className="inputLabel">Profile Picture:</p>

      <IpfsImageUpload
        image={state.img}
        style={{ padding: "5px 10px", fontSize: ".8rem", fontWeight: 600 }}
      />
    </div>

    <div className="inputContainer">
      <p className="inputLabel">Name:</p>

      <input className="input" type="text" value={state.profile.name} />
    </div>

    <div className="inputContainer">
      <p className="inputLabel">Description:</p>
      <input className="input" type="text" value={state.description} />
    </div>

    <div className="inputContainer">
      <p className="inputLabel">Location:</p>
      <input className="input" type="text" value={state.location} />
    </div>

    <div
      style={{
        padding: "15px 5px 5px 5px",
        display: "flex",
        gap: 10,
        flexDirection: "column",
      }}
    >
      <h3>Social accounts</h3>
      <div className="inputContainer">
        <p className="inputLabel">Twitter:</p>

        <input className="input" type="text" value={state.linktree.twitter} />
      </div>

      <div className="inputContainer">
        <p className="inputLabel">Github:</p>
        <input className="input" type="text" value={state.linktree.github} />
      </div>

      <div className="inputContainer">
        <p className="inputLabel">Telegram:</p>
        <input className="input" type="text" value={state.linktree.telegram} />
      </div>

      <div className="inputContainer">
        <p className="inputLabel">Website:</p>
        <input className="input" type="text" value={state.linktree.website} />
      </div>
    </div>

    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      <CommitButton
        className="buttonSuccess"
        style={{ backgroundColor: "#2ea043", color: "#ffffff" }}
        data={{ profile }}
      >
        Save profile
      </CommitButton>
    </div>
  </div>
);
