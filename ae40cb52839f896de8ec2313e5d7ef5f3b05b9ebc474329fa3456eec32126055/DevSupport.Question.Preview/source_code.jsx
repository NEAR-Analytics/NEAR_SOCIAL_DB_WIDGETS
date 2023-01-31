const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);

const question = JSON.parse(
  Social.get(`${accountId}/question/main`, blockHeight) ?? "null"
);

console.log("A", question);

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/question/main`,
  blockHeight,
};

const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  snapshot.timestamp ? snapshot.timestamp / 1000000 : Date.now()
);

const postLables = question.labels ? (
  <div class="card-title">
    {question.labels.map((label) => {
      return (
        <a
          href={`https://near.social/#/devgovgigs.near/widget/Ideas?label=${label}`}
        >
          <span class="badge p-0 pe-2 text-primary">{label}</span>
        </a>
      );
    })}
  </div>
) : null;

const likeBtnClass = "bi-arrow-up-square";

const footer = (
  <div className="card-header">
    <small class="text-muted">
      <div class="row justify-content-between">
        <div class="col-6">
          <a href="#" onClick={onLike}>
            <i class={`bi ${likeBtnClass}`}> </i>
            Upvote ({post.likes.length ?? 0})
          </a>

          <a href="#" class="text-danger ms-3" onClick={onLike}>
            <i class={`bi bi-flag`}> </i>
            Flag Question
          </a>
        </div>

        <div class="col-6">
          <div class="d-flex justify-content-end">
            {timestamp}
            <i class="bi bi-clock-history px-2"></i>
            {shareButton}
          </div>
        </div>
      </div>
    </small>
  </div>
);

return (
  <div className="border p-3">
    <h1>{question.title}</h1>
    {postLables}

    <div className="pt-2 text-break">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content: { text: question.content.text } }}
      />
    </div>

    {footer}
  </div>
);
