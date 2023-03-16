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

const link = `#/ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const likeBtnClass = "bi-arrow-up-square";

const footer = (
  <div className="card-header">
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
  <div className="container">
    <a href="https://near.social/#/ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSuport.Main">
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

    <div className="pt-2 text-break">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content: { text: question.content.text } }}
      />
    </div>

    {footer}

    <hr class="mt-4 mb-5" />

    <h4 class="mb-4"> Answers </h4>

    <Widget
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Feed"
      props={{ item, admins, adminContract }}
    />

    {context.accountId && (
      <>
        <hr class="mt-4 mb-5" />
        <h4 class="mb-4"> Reply </h4>

        <Widget
          src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Edit"
          props={{
            notifyAccountId: accountId,
            item,
            onComment: () => State.update({ showReply: false }),
          }}
        />
      </>
    )}
  </div>
);
