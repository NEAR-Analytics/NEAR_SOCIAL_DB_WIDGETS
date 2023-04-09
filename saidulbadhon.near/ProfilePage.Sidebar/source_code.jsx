const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const name = profile?.name;
const image = profile?.image;

const url = image.ipfs_cid
  ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
  : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

State.init({
  showEditProfile: false,
});

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      paddingTop: 16,
      paddingInline: 16,
    }}
  >
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            maxWidth: 250,
            width: "100%",
            minWidth: 150,
            aspectRatio: "1 / 1",
            objectFit: "cover",
            borderRadius: "50%",
            outline: "2px solid #dbdcdd",
          }}
          src={url}
          alt="profile"
        />
        <div style={{ paddingBlock: 8 }}>
          <h2 style={{ textAlign: "center", color: props.theme.textColor }}>
            {name}
          </h2>
          <p style={{ textAlign: "center", color: props.theme.textColor3 }}>
            @{accountId}
          </p>
        </div>
      </div>

      <div style={{ color: props.theme.textColor, wordBreak: "break-all" }}>
        <Markdown
          style={{
            textAlign: "center",
            color: "red",
            fontWeight: 400,
            fontSize: "1rem",
          }}
          text={profile?.description}
        />
      </div>
    </div>

    {state.showEditProfile ? (
      <>
        <Widget
          src="saidulbadhon.near/widget/ProfileSidebar.Editor"
          props={{ showEditProfile, theme: props?.theme }}
        />

        <button
          style={{ marginBottom: 20, backgroundColor: props.theme.buttonColor }}
          onClick={() => {
            State.update({
              showEditProfile: false,
            });
          }}
        >
          Cancel
        </button>
      </>
    ) : (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Widget
            src="saidulbadhon.near/widget/ProfileSidebar.SocialLinks"
            props={{ profile, theme: props.theme }}
          />
        </div>
        <button
          onClick={() => {
            State.update({
              showEditProfile: true,
            });
          }}
        >
          Edit Profile
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Widget
            src="mob.near/widget/FollowStats"
            props={{ accountId, theme: props?.theme }}
          />

          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <img
              style={{ height: 15 }}
              src="https://cdn-icons-png.flaticon.com/512/149/149060.png"
              alt="icon"
            />

            <p
              style={{
                color: props.theme.textColor3,
                fontWeight: 500,
                fontSize: ".9rem",

                margin: 0,
                padding: 0,
              }}
            >
              {profile?.location ?? "Add Location"}
            </p>
          </div>
        </div>
      </>
    )}
  </div>
);
