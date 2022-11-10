const accountId = props.accountId ?? context.accountId;
const className = props.className ?? "image";
// const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? { objectFit: "cover", width: "100px" };
const imageClassName = props.imageClassName ?? "rounded";
const thumbnail = props.thumbnail ?? "thumbnail";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name || "No-name profile";
const image = profile.image;
const title = `${name} @${accountId}`;

return (
  <div className={className} title={title}>
    <Widget
      src="mob.near/widget/Image"
      props={{
        image,
        alt: title,
        className: imageClassName,
        style: imageStyle,
        thumbnail,
        fallbackUrl: "https://thewiki.io/static/media/sasha_anon.6ba19561.png",
      }}
    />
  </div>
);
