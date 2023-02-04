const content = props.content;
const raw = !!props.raw;

return content ? (
  <>
    {content.text &&
      (raw ? (
        <pre>{content.text}</pre>
      ) : (
        <Widget
          src="mob.near/widget/SocialMarkdown"
          props={{ text: content.text }}
        />
      ))}
    {content.image &&
      (raw ? (
        <pre>{content.image}</pre>
      ) : (
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
      ))}
  </>
) : (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);
