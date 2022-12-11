const linktree = Object.entries(props.linktree ?? {});

const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
  github: {
    prefix: "https://github.com/",
    icon: "bi-github",
  },
  twitter: {
    prefix: "https://twitter.com/",
    icon: "bi-twitter",
  },
  telegram: {
    prefix: "https://t.me/",
    icon: "bi-telegram",
  },
  email: {
    prefix: "mailto:",
    icon: "bi-envelope",
  },
  discord: {
    prefix: "https://",
    icon: "bi-discord",
  },
};

const linktreeObjects = linktree.map((o, i) => {
  const key = o[0];
  let value = o[1];
  if (!value) {
    return null;
  }
  const e = linktreeElements[key];
  if (e.prefix) {
    value = value && value.replace(e.prefix, "");
  }
  const icon = e.icon ? (
    <i className={`bi ${e.icon ?? ""} text-secondary me-1`}></i>
  ) : (
    ""
  );
  return e.prefix ? (
    <span key={i}>
      <a href={`${e.prefix}${value}`}>{icon}</a>
    </span>
  ) : (
    <span key={i}>
      {key}: <a href={`${value}`}>{value}</a>
    </span>
  );
});

return <>{linktreeObjects}</>;
