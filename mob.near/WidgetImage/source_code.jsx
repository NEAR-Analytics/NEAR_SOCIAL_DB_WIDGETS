const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const className = props.className ?? "d-inline-block";
const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? {
  objectFit: "cover",
  borderRadius: "0.6em",
};
const imageClassName = props.imageClassName ?? "shadow w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const name = metadata.name ?? widgetName;
const image = metadata.image;
const title = `${name} ${widgetPath}`;

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
            "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
        }}
      />
    </div>
  </OverlayTrigger>
);
