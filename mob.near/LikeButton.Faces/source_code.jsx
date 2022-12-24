const accountId = context.accountId;

const likesByUsers = props.likesByUsers || {};
const limit = props.limit ?? 3;

let likes = Object.keys(likesByUsers).reverse();

const graphLikes = [];
const nonGraph = [];

const graph =
  (accountId &&
    Social.keys(`${accountId}/graph/follow/*`, "final")[accountId].graph
      .follow) ||
  {};

likes.forEach((accountId) => {
  if (accountId in graph) {
    graphLikes.push(accountId);
  } else {
    nonGraph.push(accountId);
  }
});

let faces = [...graphLikes, ...nonGraph];

if (faces.length < limit + 3) {
  limit = faces.length;
}

const renderFaces = faces.splice(0, limit);

const Faces = styled.span`
  .face {
    display: inline-block;
    position:relative;
    margin: -0.1em;
    height: 1.2em;
    width: 1.2em;
    min-width: 1.2em;
    vertical-align: top;
    img {
        object-fit: cover;
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
  }
`;

const numLikes = likes.length - limit;

return (
  <>
    <Faces>
      {renderFaces.map((accountId, i) => (
        <Widget
          key={i}
          src="mob.near/widget/ProfileImage"
          props={{
            metadata,
            accountId,
            widgetName,
            style: { zIndex: 10 - i },
            className: "face",
            tooltip: true,
            imageStyle: {},
            imageClassName: "",
          }}
        />
      ))}
    </Faces>
    {numLikes > 0 ? (
      <OverlayTrigger
        placement="auto"
        overlay={
          <Tooltip>
            <div
              className="text-truncate text-start"
              style={{ maxWidth: "12em" }}
            >
              {faces.slice(0, 10).map((account_id, i) => (
                <Fragment key={i}>
                  {account_id}
                  <br />
                </Fragment>
              ))}
              {faces.length > 10 ? "..." : ""}
            </div>
          </Tooltip>
        }
      >
        <span className="text-muted">
          and {numLikes} other{numLikes === 1 ? "" : "s"}
        </span>
      </OverlayTrigger>
    ) : (
      ""
    )}
  </>
);
