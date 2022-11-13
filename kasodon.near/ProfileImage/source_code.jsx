const accountId = props.accountId ?? context.accountId;
const className = props.className ?? "image";
// const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? {
  objectFit: "cover",
  width: "100px",
  height: "100px",
};
const imageClassName = props.imageClassName ?? "rounded";
const thumbnail = props.thumbnail ?? "thumbnail";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name || "No-name profile";
const image = profile.image;
const title = `${name} @${accountId}`;

return (
  <>
    <Widget
      src="mob.near/widget/Image"
      props={{
        image,
        alt: title,
        className: imageClassName,
        style: imageStyle,
        thumbnail,
        fallbackUrl:
          "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      }}
    />
  </>
);
