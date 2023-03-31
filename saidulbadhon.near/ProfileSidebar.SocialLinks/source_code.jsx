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

    backgroundColor: "rgba(0, 0, 0, 0.05)",

    transition: "all 0.2s ease-in-out",
  },
  invertColor: {
    filter: "invert(10%)",
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
                style={styles.invertColor}
                style={{ height: 20, opacity: 0.5 }}
                src="https://cdn-icons-png.flaticon.com/512/733/733635.png"
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
                  style={styles.invertColor}
                  style={{ height: 20, opacity: 0.5 }}
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111425.png"
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
                  style={styles.invertColor}
                  style={{ height: 20, opacity: 0.5 }}
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111708.png"
                  alt="telegram"
                />
              </a>
            )) ||
            (name === "website" && (
              <a style={styles.socialIcon} href={value} target="_blank">
                <img
                  style={styles.invertColor}
                  style={{ height: 20, opacity: 0.5 }}
                  src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
                  alt="website"
                />
              </a>
            ))}
        </>
      ))}
  </div>
);
