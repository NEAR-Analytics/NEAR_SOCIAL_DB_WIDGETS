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

const styles = {
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 7.5,
  },
  inputLabel: {
    padding: 0,
    margin: 0,
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    minHeight: 30,
    border: "1px solid #d0d7de",
    borderRadius: 5,
    resize: "vertical",
    paddingInline: 7.5,
  },

  buttonSuccess: {
    fontWeight: 600,
    border: "1px solid #d0d7de",
    width: "100%",
    height: 40,
    borderRadius: 5,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "#2ea043",
    color: "#ffffff",
  },
};

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 20,
      width: "100%",
    }}
  >
    <div style={styles.inputContainer}>
      <p style={styles.inputLabel}>Profile Picture:</p>

      <IpfsImageUpload
        image={state.img}
        style={{ padding: "5px 10px", fontSize: ".8rem", fontWeight: 600 }}
      />
    </div>

    <div style={styles.inputContainer}>
      <p style={styles.inputLabel}>Name:</p>

      <input style={styles.input} type="text" value={state.profile.name} />
    </div>

    <div style={styles.inputContainer}>
      <p style={styles.inputLabel}>Description:</p>
      <input style={styles.input} type="text" value={state.description} />
    </div>

    <div style={styles.inputContainer}>
      <p style={styles.inputLabel}>Location:</p>
      <input style={styles.input} type="text" value={state.location} />
    </div>

    <div
      style={{
        paddingTop: 15,
        display: "flex",
        gap: 10,
        flexDirection: "column",
      }}
    >
      <h3>Social accounts</h3>
      <div style={styles.inputContainer}>
        <p style={styles.inputLabel}>Twitter:</p>

        <input
          style={styles.input}
          type="text"
          value={state.linktree.twitter}
        />
      </div>

      <div style={styles.inputContainer}>
        <p style={styles.inputLabel}>Github:</p>
        <input style={styles.input} type="text" value={state.linktree.github} />
      </div>

      <div style={styles.inputContainer}>
        <p style={styles.inputLabel}>Telegram:</p>
        <input
          style={styles.input}
          type="text"
          value={state.linktree.telegram}
        />
      </div>

      <div style={styles.inputContainer}>
        <p style={styles.inputLabel}>Website:</p>
        <input
          style={styles.input}
          type="text"
          value={state.linktree.website}
        />
      </div>
    </div>

    <div
      style={{
        display: "flex",
        gap: 20,
        marginTop: 20,
        width: "100%",
      }}
    >
      <CommitButton style={styls.buttonSuccess} data={{ profile }}>
        Save profile
      </CommitButton>
    </div>
  </div>
);
