const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const isEntity = props.isEntity ?? false;
const size = props.size ?? "1.5em";

State.init({
  data: null,
});

Near.asyncView(
  ownerId,
  isEntity ? "get_entity" : "get_contributor",
  { account_id: accountId },
  "final"
).then((data) => State.update({ data }));

const profile = Social.getr(`${accountId}/profile`);

const fullName = profile.name || state.data.name || accountId;
const image = profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const imageSrc = `https://i.near.social/thumbnail/${url}`;

const Image = styled.img`
  border-radius: 100%;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: inline-block;
`;

if (state.data || profile) {
  return (
    <div
      className="profile-circle d-inline-block"
      title={`${fullName} @${accountId}`}
      style={{ width: size, height: size }}
    >
      <Image src={imageSrc} alt="profile image" />
    </div>
  );
}
