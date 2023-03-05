const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/insta`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const Wrapper = styled.div`
  position: relative;

  @media (min-width: 576px) {
    max-width: 288px;
  }

  .info {
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0;
    padding: 0.5em;
  }

  &:hover {
    .info {
      opacity: 1;
    }
  }
`;

const imageStyle = props.imageStyle ?? { objectFit: "cover" };
const imageClassName = props.imageClassName ?? "w-100 h-100";

return (
  <Wrapper>
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: content.image,
        style: imageStyle,
        className: imageClassName,
      }}
    />
    <div className="info">
      <a
        href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        target="_blank"
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{ accountId, tooltip: true }}
        />
      </a>
    </div>
  </Wrapper>
);
