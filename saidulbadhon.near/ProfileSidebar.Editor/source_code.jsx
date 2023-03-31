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
    gap: 4,
  },
  inputLabel: {
    padding: 0,
    margin: 0,
    color: props.theme.textColor3,
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    minHeight: 30,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 4,
    resize: "vertical",
    paddingInline: 8,
    color: props.theme.textColor2,
  },

  buttonSuccess: {
    fontWeight: 500,
    // border: "1px solid #d0d7de",
    width: "100%",
    height: 40,
    borderRadius: 4,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "#2ea043",
    color: props.theme.buttonTextColor,
  },
};

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%",
    }}
  >
    <div style={styles.inputContainer}>
      <p style={styles.inputLabel}>Profile Picture:</p>

      <IpfsImageUpload
        image={state.img}
        style={{
          fontWeight: 500,
          // border: "1px solid #d0d7de",
          width: "100%",
          cursor: "pointer",
          height: 40,
          padding: 0,
          borderRadius: 4,
          backgroundColor: props.theme.buttonColor,
          color: props.theme.buttonTextColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
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
        paddingTop: 40,
        display: "flex",
        gap: 10,
        flexDirection: "column",
      }}
    >
      <h3 style={{ color: props.theme.textColor }}>Social accounts</h3>
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
      <CommitButton style={styles.buttonSuccess} data={{ profile }}>
        Save profile
      </CommitButton>
    </div>
  </div>
);
