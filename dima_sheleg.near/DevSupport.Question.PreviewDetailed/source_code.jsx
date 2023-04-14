const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const admins = props.admins;
const adminContract = props.adminContract;
const question = props.question;
const children = props.children;

const is_hidden = Near.view(adminContract, "is_hidden", {
  id: { account_id: accountId, block_height: blockHeight },
});

if (is_hidden) {
  return "";
}

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #11181C;
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
const PostContentWrapper = styled.div`
    color: #687076;
    font-size: 16px;
`;
const NftImageWrapper = styled.div`
    max-height: "220px",
    max-width: "78vw",
    overflow: "scroll",
`;

return (
  <div class="row">
    <div class="col-1">
      {/* Upvote Widget */}
      <Widget
        src="dima_sheleg.near/widget/DevSupport.Question.Button.Upvote"
        props={{ accountId, blockHeight }}
      />
    </div>
    <div class="col-11">
      <div class="row">
        <H1>{question.title}</H1>
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
            &nbsp;ago
          </div>
        </H6>
      </div>
      <div class="row">
        <PostContentWrapper className="mt-5">
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content: { text: question.content.text } }}
          />

          {question.content.image.ipfs_cid && (
            <NftImageWrapper className="text-center mt-1 mb-3 mx-auto">
              <img
                class="img-fluid"
                src={`https://ipfs.near.social/ipfs/${question.content.image.ipfs_cid}`}
                alt="uploaded"
              />
            </NftImageWrapper>
          )}
        </PostContentWrapper>
      </div>

      {children}
    </div>
  </div>
);
