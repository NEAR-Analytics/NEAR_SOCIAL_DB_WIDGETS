const accountId = props.accountId ?? context.accountId;
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;
const profile = Social.getr(`${accountId}/profile`);
const meme = props.meme ?? Social.getr(`${accountId}/post/meme`, blockHeight);

if (!meme) {
  return "Loading";
}

if (!props.meme && !blockHeight) {
  blockHeight = Social.keys(`${accountId}/post/meme`, undefined, {
    return_type: "BlockHeight",
  })[accountId].post.meme;
  if (!blockHeight) {
    return "Loading";
  }
}

const memeTimeMs = props.meme
  ? Date.now()
  : parseFloat(Near.block(blockHeight).header.timestamp_nanosec) / 1e6;

const url = meme.image.ipfs_cid
  ? `https://ipfs.near.social/ipfs/${meme.image.ipfs_cid}`
  : null;

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0} seconds ago`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0} minutes ago`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0} hours ago`
    : `${(diffSec / 86400000) | 0} days ago`;

return (
  <div
    style={{
      backgroundColor: "#ecf2ff",
      width: "600px",
      height: "500px",
      borderRadius: "40px",
      padding: "10px",
      border: "3px solid #FEFFFE",
    }}
    className="meme-single d-flex flex-column justify-content-between hover-shadow"
  >
    <div
      style={{ marginLeft: "20px", height: "7%" }}
      className="profile d-flex align-items-center"
    >
      <div style={{}}>
        {profileLink(
          <Widget
            src="kasodon.near/widget/MemeProfileImage"
            props={{ accountId }}
          />
        )}
      </div>
      <div className="profile-text">
        <h4
          style={{ fontSize: "16px", marginBottom: "2px" }}
          className="m-0 text-capitalize"
        >
          {profile.name.length > 20
            ? `${profile.name.substring(0, 20)}...`
            : profile.name}
        </h4>
        <p style={{ fontSize: "14px" }} className="m-0 text-lowercase">
          {accountId.length > 30
            ? `@${accountId.substring(0, 30)}...`
            : `@${accountId}`}
        </p>
      </div>
    </div>
    <div
      style={{
        height: "68%",
        width: "100%",
        background: "#060d19",
        borderRadius: "30px",
      }}
      className="meme-img hover-zoom"
    >
      <img
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
          borderRadius: "30px",
          backgroundSize: "contain",
        }}
        src={url}
        alt={meme.title}
      />
    </div>
    <div
      style={{ width: "100%", marginLeft: "20px", marginBottom: "15px" }}
      className="meme-detail"
    >
      <div className="meme-detail-text" style={{}}>
        {meme.title && (
          <h4
            style={{
              margin: "0",
              fontSize: "18px",
              textTransform: "capitalize",
            }}
          >
            {meme.title.length > 25
              ? `${meme.title.substring(0, 25)}...`
              : meme.title}
          </h4>
        )}
        {meme.description && (
          <p
            style={{
              margin: "0",
              fontSize: "15px",
              textTransform: "lowercase",
            }}
          >
            {meme.description}
            {meme.description.length > 40
              ? `${meme.description.substring(0, 40)}...`
              : meme.description}
          </p>
        )}
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "5px",
        }}
        classNmae="meme-detail-note"
      >
        <div className="icons" style={{}}>
          <span style={{ marginRight: "7px" }} className="">
            <i className="bi bi-star me-1"></i>4
          </span>
          <span style={{ marginRight: "7px" }} className="">
            <i className="bi bi-chat-square me-1"></i>20
          </span>
          <span style={{ marginRight: "7px" }} className="">
            <i className="bi bi-reply me-1"></i>1
          </span>
        </div>
        <div className="timestamp" style={{}}>
          <span className="">
            <i className="bi bi-clock me-1"></i>
            {timeAgo(Date.now() - memeTimeMs)}
          </span>
        </div>
      </div>
    </div>
  </div>
);
