const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const linktree = profile.linktree;

return (
  <div className="socialLinks">
    {linktree &&
      Object.entries(linktree)?.map(([name, value], index) => (
        <>
          {(name === "twitter" && (
            <a
              className="socialIcon"
              href={`https://twitter.com/${value}`}
              target="_blank"
            >
              <img
                className="invertColor"
                style={{ height: 20, opacity: 0.5 }}
                src="https://cdn-icons-png.flaticon.com/512/733/733635.png"
                alt="twitter"
              />
            </a>
          )) ||
            (name === "github" && (
              <a
                className="socialIcon"
                href={`https://github.com/${value}`}
                target="_blank"
              >
                <img
                  className="invertColor"
                  style={{ height: 20, opacity: 0.5 }}
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111425.png"
                  alt="github"
                />
              </a>
            )) ||
            (name === "telegram" && (
              <a
                className="socialIcon"
                href={`https://telegram.me/${value}`}
                target="_blank"
              >
                <img
                  className="invertColor"
                  style={{ height: 20, opacity: 0.5 }}
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111708.png"
                  alt="telegram"
                />
              </a>
            )) ||
            (name === "website" && (
              <a className="socialIcon" href={value} target="_blank">
                <img
                  className="invertColor"
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
