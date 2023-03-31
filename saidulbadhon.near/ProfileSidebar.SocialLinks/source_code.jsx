const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const linktree = profile.linktree;

const styles = {
  socialLinks: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  socialIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor:
      props.theme.name === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, 0.05)",

    transition: "all 0.2s ease-in-out",
  },
  img: {
    height: 20,
  },
};

return (
  <div style={styles.socialLinks}>
    {linktree &&
      Object.entries(linktree)?.map(([name, value], index) => (
        <>
          {(name === "twitter" && (
            <a
              style={styles.socialIcon}
              href={`https://twitter.com/${value}`}
              target="_blank"
            >
              <img
                style={styles.img}
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="twitter"
              />
            </a>
          )) ||
            (name === "github" && (
              <a
                style={styles.socialIcon}
                href={`https://github.com/${value}`}
                target="_blank"
              >
                <img
                  style={styles.img}
                  src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                  alt="github"
                />
              </a>
            )) ||
            (name === "telegram" && (
              <a
                style={styles.socialIcon}
                href={`https://telegram.me/${value}`}
                target="_blank"
              >
                <img
                  style={styles.img}
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
                  alt="telegram"
                />
              </a>
            )) ||
            (name === "website" && (
              <a style={styles.socialIcon} href={value} target="_blank">
                <img
                  style={styles.img}
                  src="https://cdn-icons-png.flaticon.com/512/3059/3059997.png"
                  alt="website"
                />
              </a>
            ))}
        </>
      ))}
  </div>
);
