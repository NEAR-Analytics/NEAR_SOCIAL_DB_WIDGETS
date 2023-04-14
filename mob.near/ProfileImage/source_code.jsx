const accountId = props.accountId ?? context.accountId;
const className = props.className ?? "profile-image d-inline-block";
const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? { objectFit: "cover" };
const imageClassName = props.imageClassName ?? "rounded w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name || "No-name profile";
const image = profile.image;
const title = `${name} @${accountId}`;

return (
  <OverlayTrigger placement="auto" overlay={<Tooltip>{title}</Tooltip>}>
    <div className={className} title={title} style={style}>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image,
          alt: title,
          className: imageClassName,
          style: imageStyle,
          thumbnail,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
        }}
      />
    </div>
  </OverlayTrigger>
);
