const content = props.content;
return content ? (
  <>
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
  </>
) : (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);
