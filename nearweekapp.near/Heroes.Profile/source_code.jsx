const accountId = props.accountId;
const createdAt = props.createdAt;

const profile = Social.getr(`${accountId}/profile`);
const image = profile.image;
const url =
  (image.ipfs_cid
    ? `https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

function formatDate(epoch) {
  const dateObj = new Date(epoch / 1000000);
  const humanDate = dateObj.toLocaleString();
  return humanDate;
}

const claimBadgeClass =
  props.claimStatus === "Approved"
    ? " text-bg-success"
    : " text-bg-warning text-white";

return (
  <div className="profile">
    <div
      className="profile-image float-start me-2"
      style={{ width: "3em", height: "3em" }}
    >
      <img
        className="rounded w-100 h-100"
        style={{ objectFit: "cover" }}
        src={url}
        alt="profile image"
      />
    </div>
    <div className="profile-info d-inline-block">
      <div>{accountId}</div>
      <div class="small text-decoration-underline">{formatDate(createdAt)}</div>
    </div>
    <span class={"badge p-2 float-end " + claimBadgeClass}>
      <div class=""> {props.claimStatus}</div>
    </span>{" "}
  </div>
);
