const className = props.className ?? "profile-image d-inline-block";
const style = props.style ?? {
  width: "auto",
  height: "100%",
};
const imageClassName =
  props.imageClassName ?? "rounded w-auto h-100 object-fit-contain";
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
