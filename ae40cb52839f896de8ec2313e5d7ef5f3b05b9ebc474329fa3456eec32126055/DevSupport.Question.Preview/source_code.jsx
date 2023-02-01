const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const question = JSON.parse(
  Social.get(`${accountId}/question/main`, blockHeight) ?? "null"
);

const link = `#/ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

return (
  <div className="border p-3">
    <h2>
      <a className="text-black" href={link}>
        {question.title}
      </a>
    </h2>

    <Widget
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.LabelsDisplay"
      props={{ labels: question.labels }}
    />

    <div className="pt-2">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content: { text: question.content.text } }}
      />
    </div>

    <div>
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

            {/* Make into a widget */}
            <a href="#" class="ms-3">
              <i class={`bi bi-chat`}> </i> Answers [0]
            </a>
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
  </div>
);
