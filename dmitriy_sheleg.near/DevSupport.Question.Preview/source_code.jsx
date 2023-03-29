const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const admins = props.admins;
const adminContract = props.adminContract;

// {
//   "accountId": "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055",
//   "blockHeight": "84207156"
// }

const is_hidden = Near.view(adminContract, "is_hidden", {
  id: { account_id: accountId, block_height: blockHeight },
});

if (is_hidden) {
  return "";
}

const question = JSON.parse(
  Social.get(`${accountId}/question/main`, blockHeight) ?? "null"
);

const link = `#/dmitriy_sheleg.near/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}&adminContract=${adminContract}`;

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

      & + i {
        visibility: visible;
      }
    }

    & + i {
      transition: visibility .1s ease-out;
      visibility: hidden;
      color: #30A46C;
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
  <div className={`${display} p-3`}>
    <div class="row">
      <div class="col-1">
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            imageClassName: "rounded-circle w-100 h-100",
          }}
        />
      </div>
      <div class="col-1">
        {/* Upvote Widget */}
        <Widget
          src="dmitriy_sheleg.near/widget/DevSupport.Question.Button.Upvote"
          props={{ accountId, blockHeight }}
        />
      </div>
      <div class="col-10">
        <div class="row">
          <H2>
            <a href={link}>{question.title}</a>
            <i class="bi bi-arrow-right" />
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
              src="dmitriy_sheleg.near/widget/DevSupport.Question.Button.Answers"
              props={{ accountId, blockHeight }}
            />
          </div>
          {/*
          // Flag question widget
          <div class="col">
            <Widget
              src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Flag"
              props={{ accountId, blockHeight }}
            />
          </div>
          */}
        </div>
      </div>
    </div>

    {/*
    <Widget
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.LabelsDisplay"
      props={{ labels: question.labels }}
    />
  */}
    {/*
    <div>
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-8">
            // Delete widget
            <Widget
              src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Button.Delete"
              props={{ accountId, blockHeight, admins, adminContract }}
            />
          </div>
        </div>
      </small>
    </div>
    */}
  </div>
);
