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
const repliesCount = Social.index("answer", item);

const questionUrl = `#/dima_sheleg.near/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}`;
const shareUrl = `https://near.social${questionUrl}`;

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

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #11181C;
  }
`;
const H4 = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: #687076;

  a {
    color: inherit;
    transition: color .15s ease;
    &:hover {
      color: #30A46C;
      text-decoration: none;
    }

    & i {
      transition: color .1s ease-out;
      color: inherit;
    }
  }
`;
const H6 = styled.h6`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #687076;
`;
const SidebarWrapper = styled.div`
  border-left: 1px solid #ECEEF0;
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
  <div className="container pt-2 pb-5">
    <H4>
      <a href="https://near.social/#/dmitriy_sheleg.near/widget/DevSuport.Main">
        <i class="bi bi-arrow-left me-2" />
        Back to Discussions
      </a>
    </H4>

    <div class="row mt-5">
      <div class="col-8 pe-5">
        <Widget
          src="dima_sheleg.near/widget/DevSupport.Question.PreviewDetailed"
          props={{
            accountId,
            blockHeight,
            admins,
            adminContract,
            question,
            children: (
              <>
                {context.accountId && (
                  <Widget
                    src="dima_sheleg.near/widget/DevSupport.Answer.Edit"
                    props={{
                      notifyAccountId: accountId,
                      item,
                      onComment: () => State.update({ showReply: false }),
                    }}
                  />
                )}

                <H2 className="mt-5 mb-4">{repliesCount.length} Replies</H2>
                <div class="row">
                  <div class="col-12">
                    <Widget
                      src="dima_sheleg.near/widget/DevSupport.Answer.Feed"
                      props={{ item, admins, adminContract }}
                    />
                  </div>
                </div>
              </>
            ),
          }}
        />
      </div>
      <SidebarWrapper className="col-4 ps-5">
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
      </SidebarWrapper>
    </div>
    {/*{footer}*/}
  </div>
);
