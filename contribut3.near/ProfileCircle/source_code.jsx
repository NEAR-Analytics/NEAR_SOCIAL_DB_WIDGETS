const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const isEntity = props.isEntity ?? false;

State.init({
  data: null,
});

Near.asyncView(
  ownerId,
  isEntity ? "get_entity" : "get_contributor",
  { account_id: accountId },
  "final",
  true
).then((data) => State.update({ data }));

const profile = Social.getr(`${accountId}/profile`);

if (!state.data || !profile) {
  return (
    <div
      className="profile-circle d-inline-block"
      title={`loading...`}
      style={{ width: "1.5em", height: "1.5em" }}
    >
      <img
        className="rounded-circle w-100 h-100"
        style={{ objectFit: "cover" }}
        src={`https://i.near.social/thumbnail/https://thewiki.io/static/media/sasha_anon.6ba19561.png`}
        alt="profile image"
      />
    </div>
  );
}

const fullName = profile.name || state.data.name || accountId;
const image = profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

return (
  <div
    className="profile-circle d-inline-block"
    title={`${fullName} @${accountId}`}
    style={{ width: "1.5em", height: "1.5em" }}
  >
    <img
      className="rounded-circle w-100 h-100"
      style={{ objectFit: "cover" }}
      src={`https://i.near.social/thumbnail/${url}`}
      alt="profile image"
    />
  </div>
);
