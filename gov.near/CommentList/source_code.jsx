const comments = Social.index("project", "comments") || [];
comments = comments.reverse();

const { searchString, setSelectedComment } = props;

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex justify-content-end"></div>
    <div className="d-flex flex-column gap-3">
      {comments.map((q) => {
        const commenter = q.value.split("--")[0];
        const comment = Social.getr(
          `${commenter}/experimental/genie/comments/${q.value}`
        );
        // return nothing if data does not meet schema
        if (!comment?.title || !comment?.content) {
          return <></>;
        }

        // return nothing if comment does not meet search criteria
        if (
          searchString &&
          !comment.title.toLowerCase().includes(searchString.toLowerCase()) &&
          !comment.content.toLowerCase().includes(searchString.toLowerCase())
        ) {
          return <></>;
        }
        return (
          <div
            key={q.value}
            className="d-flex flex-column gap-1"
            style={{
              borderTop: "0.5px solid #D3D3D3",
              padding: "1.5rem 0 0 0",
            }}
            onClick={() => {
              setSelectedComment(q.value);
            }}
          >
            <Widget
              src={"michaelpeter.near/widget/GenieQuestionView"}
              props={{ commentRef: q.value, searchString: props.searchString }}
            />
          </div>
        );
      })}
    </div>
  </div>
);
