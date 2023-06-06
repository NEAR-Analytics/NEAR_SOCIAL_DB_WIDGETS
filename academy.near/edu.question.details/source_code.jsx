const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const admins = props.admins;
const adminContract = props.adminContract;
const question = props.question;

const item = { accountId, blockHeight, adminContract };

const is_hidden = Near.view(adminContract, "is_hidden", {
  id: { account_id: accountId, block_height: blockHeight },
});

if (is_hidden) {
  return "";
}

const repliesCount = Social.index("answer", item);

const Answer = styled.div`
    padding: 1em 0em;
`;
const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #11181C;
  }
`;
const H2 = styled.h2`
  font-size: 20px;
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


const ShareButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 25px;
  height: 40px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  color: #006ADC !important;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }

  .bi-16 {
    font-size: 16px;
  }
`;
return (
  <>
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
      <Widget
        src="dev-support.near/widget/DevSupport.Question.Button.Upvote"
        props={{ accountId, blockHeight }}
      />
        <Widget
          src="dmitriy_sheleg.near/widget/AccountProfileCard"
          props={{ accountId }}
        />
        <H6 className="pt-5 pb-3">share</H6>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
        >
          <ShareButton
            className="share-url"
            type="button"
            onMouseLeave={() => {
              State.update({ copiedShareUrl: false });
            }}
            onClick={() => {
              clipboard.writeText(shareUrl).then(() => {
                State.update({ copiedShareUrl: true });
              });
            }}
          >
            {state.copiedShareUrl ? (
              <i className="bi-16 bi bi-check"></i>
            ) : (
              <i className="bi-16 bi-link-45deg"></i>
            )}
          </ShareButton>
        </OverlayTrigger>

    </div>
    <hr />
    {context.accountId && (
      <Answer>
        <H2>Join the Discussion</H2>
        <div class="px-2">
          <Widget
            src="dev-support.near/widget/DevSupport.Answer.Edit"
            props={{
              notifyAccountId: accountId,
              previewWidget:
                "dev-support.near/widget/DevSupport.Question.Page",
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      </Answer>
    )}

    <H2 className="mt-5 mb-4">{repliesCount.length} Replies</H2>
    <div class="row">
      <div class="col-12">
        <Widget
          src="dev-support.near/widget/DevSupport.Answer.Feed"
          props={{ item, admins, adminContract }}
        />
      </div>
    </div>
  </>
);
