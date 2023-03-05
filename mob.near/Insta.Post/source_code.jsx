const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/insta`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const Wrapper = styled.div`
  @media (min-width: 576px) {
    max-width: 288px;
  }

  .info {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    opacity: 0;
    padding: 0.5em;
    box-shadow: inset 0 0 3em 2em #ddd;
  }

  &:hover {
    .info {
      opacity: 1;
    }
  }
`;

const imageStyle = props.imageStyle ?? {
  objectFit: "cover",
};
const imageClassName = props.imageClassName ?? "w-100 h-100";

return (
  <Wrapper className="ratio ratio-1x1">
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
          props={{
            accountId,
            tooltip: true,
            imageStyle: {
              objectFit: "cover",
              boxShadow: "0 0 0.5em #333",
            },
          }}
        />
      </a>
    </div>
  </Wrapper>
);
