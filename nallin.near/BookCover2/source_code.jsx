const className = props.className ?? "profile-image d-inline-block";
const style = props.style ?? { width: "30%", height: "auto" };
const imageStyle = props.imageStyle ?? { objectFit: "fit" };
const imageClassName = props.imageClassName ?? "rounded w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const book = props.book ?? {};
const title = props.title ?? "Not provided";
const cover = book.cover;

const inner = (
  <div className={className} style={style}>
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: cover,
        alt: title,
        className: imageClassName,
        style: imageStyle,
        thumbnail,
        fallbackUrl:
          "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
      }}
    />
  </div>
);

return tooltip ? (
  <OverlayTrigger placement="auto" overlay={<Tooltip>{title}</Tooltip>}>
    {inner}
  </OverlayTrigger>
) : (
  inner
);
