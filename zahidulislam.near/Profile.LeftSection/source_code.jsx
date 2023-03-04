const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const name = profile?.name;
const image = profile?.image;

const url = image.ipfs_cid
  ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
  : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
).body;

const css = fetch(
  "https://raw.githubusercontent.com/cryptosynk/near-social-profile/main/css/mainLight.css"
).body;

const Theme = styled.div`
  font-family: "Open Sans", sans-serif;
  ${cssFont}
  ${css}
`;

if (!cssFont || !css) return "Loading fonts & css";

State.init({
  showEditProfile: false,
});

return (
  <Theme>
    <div className="leftSection">
      <div>
        <div>
          <img className="profileImage" src={url} alt="profile" />
          <div style={{ paddingBlock: 10 }}>
            <h2>{name}</h2>
            <p>@{accountId}</p>
          </div>
        </div>

        <p className="description">{profile?.description}</p>
      </div>

      {state.showEditProfile ? (
        <>
          <Widget
            src="zahidulislam.near/widget/Profile.Editor"
            props={{ showEditProfile }}
          />

          <button
            style={{ marginBottom: 20 }}
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
          <Widget
            src="zahidulislam.near/widget/Profile.SocialLinks"
            props={{ profile }}
          />
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
              src="zahidulislam.near/widget/Profile.IconButton"
              props={{
                icon: "https://cdn-icons-png.flaticon.com/512/681/681494.png",
                label: `${profile.followers.length ?? 0} followers · ${
                  profile.followings.length ?? 0
                } following`,
              }}
            />

            <Widget
              src="zahidulislam.near/widget/Profile.IconButton"
              props={{
                icon: "https://cdn-icons-png.flaticon.com/512/3179/3179068.png",
                label: profile?.location ?? "Add Location",
              }}
            />
          </div>
        </>
      )}
    </div>
  </Theme>
);
