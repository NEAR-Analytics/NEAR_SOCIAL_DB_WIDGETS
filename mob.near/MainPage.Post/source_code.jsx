const accountId = props.accountId;
const blockHeight = props.blockHeight;
const content = props.content;

return (
  <div className="border rounded-4 p-3">
    <div className="d-flex flex-row align-items-center">
      <div className="flex-grow-1 text-truncate">
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId }}
        />
      </div>
      <small className="text-nowrap text-muted ">
        <Widget
          src="mob.near/widget/TimeAgo"
          props={{ blockHeight, now: blockHeight === "now" }}
        />
      </small>
    </div>
    <div className="mt-3">
      {content.text && <Markdown text={content.text} />}
      {content.image && (
        <div className="w-100 rounded-3 text-center">
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: content.image,
              className: "img-fluid rounded-3",
              style: { maxHeight: "20em" },
            }}
          />
        </div>
      )}
    </div>
  </div>
);
