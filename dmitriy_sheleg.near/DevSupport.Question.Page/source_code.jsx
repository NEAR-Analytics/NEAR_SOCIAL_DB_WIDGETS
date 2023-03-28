if (context.loading) {
  return "Loading";
}

const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

if (accountId === undefined || blockHeight === undefined) {
  return;
}

const adminContract = props.adminContract;

const admins = Near.view(adminContract, "get_admins", {});

const question = JSON.parse(
  Social.get(`${accountId}/question/main`, blockHeight) ?? "null"
);

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/question/main`,
  blockHeight,
};

const link = `#/dmitriy_sheleg.near/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const footer = (
  <div className="card-header p-2" style={{ border: "1px solid #ccc" }}>
    <small class="text-muted">
      <div class="row justify-content-between">
        <div class="col-8">
          {/* Upvote Widget */}
          <Widget
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Upvote"
            props={{ accountId, blockHeight }}
          />

          {/* Flag question widget */}
          <Widget
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Flag"
            props={{ accountId, blockHeight }}
          />

          {/* Answers widget */}
          <Widget
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Answers"
            props={{ accountId, blockHeight }}
          />

          {/* Delete widget */}
          <Widget
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Delete"
            props={{ accountId, blockHeight, admins, adminContract }}
          />
        </div>

        <div class="col-4">
          <div class="d-flex justify-content-end">
            <Widget
              src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/BlockToDate"
              props={{ blockHeight }}
            />
          </div>
        </div>
      </div>
    </small>
  </div>
);

return (
  <div className="container pt-2 pb-5">
    <a href="https://near.social/#/dmitriy_sheleg.near/widget/DevSuport.Main">
      Go Back
    </a>

    <h2 class="mt-3">
      <a className="text-black" href={link}>
        {question.title}
      </a>
    </h2>

    <Widget
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.LabelsDisplay"
      props={{ labels: question.labels }}
    />

    <div className="py-2 text-break">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content: { text: question.content.text } }}
      />
    </div>

    {question.content.image.ipfs_cid && (
      <>
        <div
          class="text-center mt-1 mb-3 mx-auto"
          style={{
            borderBottom: "1px solid #eee",
            maxHeight: "220px",
            maxWidth: "78vw",
            overflow: "scroll",
            borderTop: "1px solid #eee",
          }}
        >
          <img
            src={`https://ipfs.near.social/ipfs/${question.content.image.ipfs_cid}`}
            alt="uploaded"
          />
        </div>
      </>
    )}

    {footer}

    <div class="mt-3 mb-5" />

    <h4 class="mb-3"> Community Answers </h4>

    <Widget
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Feed"
      props={{ item, admins, adminContract }}
    />

    <div class="mb-5" />

    {context.accountId && (
      <>
        <hr class="w-75 mx-auto mb-5" />
        <div class="p-4" style={{ border: "1px solid rgb(118, 203, 238)" }}>
          <h4 class="mb-2"> Your Answer </h4>

          <Widget
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Edit"
            props={{
              notifyAccountId: accountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
        <div class="mb-5" />
      </>
    )}
  </div>
);
