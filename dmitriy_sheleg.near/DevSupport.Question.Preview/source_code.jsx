// const accountId = props.accountId;
// const blockHeight = parseInt(props.blockHeight);
const accountId =
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055";
const blockHeight = 84207156;
const admins = props.admins;
const adminContract = props.adminContract;

const is_hidden = Near.view(adminContract, "is_hidden", {
  id: { account_id: accountId, block_height: blockHeight },
});

if (is_hidden) {
  return "";
}

const question = JSON.parse(
  Social.get(`${accountId}/question/main`, blockHeight) ?? "null"
);

const link = `#/ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}&adminContract=${adminContract}`;

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #11181C;

  a {
    color: inherit;
    transition: color .15s ease;
    &:hover {
      color: #30A46C;
      text-decoration: none;
    }
  }
`;
const H6 = styled.h6`
  font-size: 14px;
  font-weight: 500;
  color: #687076;
`;
const Trancate = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`;
const TopicName = styled.span`
  color: #006ADC;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
`;

return (
  <div className={`border ${display} p-3`}>
    <div class="row">
      <div class="col-2">avatar</div>
      <div class="col-2">
        {/* Upvote Widget */}
        <Widget
          // src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Upvote"
          src="dmitriy_sheleg.near/widget/DevSupport.Question.Button.Upvote"
          props={{ accountId, blockHeight }}
        />
      </div>
      <div class="col-8">
        <div class="row">
          <H2>
            <a href={link}>{question.title}</a>
          </H2>
          <H6>
            <div class="d-flex">
              <Trancate>{accountId}</Trancate>
              &nbsp;in&nbsp;
              <TopicName>
                <Widget
                  src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.LabelsDisplay"
                  props={{ labels: question.labels }}
                />
              </TopicName>
              &nbsp;&#8226;&nbsp;
              <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
            </div>
          </H6>
        </div>
        <div class="row">
          <div class="col">
            <Widget
              src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Answers"
              props={{ accountId, blockHeight }}
            />
          </div>
        </div>
      </div>
    </div>

    {/*
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
  */}
    {/*
    <div>
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-8">
            // Upvote Widget
            <Widget
              src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Upvote"
              props={{ accountId, blockHeight }}
            />

            // Flag question widget
            <Widget
              src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Flag"
              props={{ accountId, blockHeight }}
            />

            // Answers widget
            <Widget
              src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Answers"
              props={{ accountId, blockHeight }}
            />

            // Delete widget
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
    */}
  </div>
);
