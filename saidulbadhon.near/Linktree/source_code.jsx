const profile = {
  avatar:
    "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  title: "Zahid Islam",
  subtitle: "Data Engineer",
  links: [
    { title: "github", url: "https://github.com/zahid-dev" },
    { title: "twitter", url: "https://twitter.com/zahid-dev" },
  ],
  socials: [
    { title: "github", url: "https://github.com/zahid-dev" },
    { title: "twitter", url: "https://twitter.com/zahid-dev" },
  ],
};

const titleToIcon = [
  {
    title: "github",
    icon: <i class="bi bi-github"></i>,
  },
  {
    title: "twitter",
    icon: <i class="bi bi-twitter"></i>,
  },
  {
    title: "facebook",
    icon: <i class="bi bi-facebook"></i>,
  },
  {
    title: "whatsapp",
    icon: <i class="bi bi-whatsapp"></i>,
  },
  {
    title: "linkedin",
    icon: <i class="bi bi-linkedin"></i>,
  },
];

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      height: "100%",
      padding: "0 8px",
    }}
  >
    <img
      style={{
        height: "100%",
        maxHeight: 200,
        borderRadius: "50%",
        aspectRatio: 1 / 1,
        objectFit: "cover",
      }}
      src={profile.avatar}
      alt={profile.title}
    />

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: props.theme.textColor }}>{profile.title}</h2>
      <h5 style={{ color: props.theme.textColor2 }}>{profile.subtitle}</h5>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        maxWidth: 400,
      }}
    >
      {profile.links?.map((link) => (
        <a href={link.url} target="_blank">
          <button style={{ width: "100%" }}>{link.title}</button>
        </a>
      ))}
    </div>

    <div style={{ display: "flex", gap: 16 }}>
      {profile.socials?.map((link) => (
        <a href={link.url} target="_blank" style={{ fontSize: "1.5rem" }}>
          {titleToIcon.find((ti) => ti.title === link.title).icon}
        </a>
      ))}
    </div>
  </div>
);
