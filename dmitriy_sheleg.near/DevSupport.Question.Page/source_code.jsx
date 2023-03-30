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
const SidebarWrapper = styled.div`
  border-left: 1px solid #ECEEF0;
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
          src="dmitriy_sheleg.near/widget/DevSupport.Question.PreviewDetailed"
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
                    src="dmitriy_sheleg.near/widget/DevSupport.Answer.Edit"
                    props={{
                      notifyAccountId: accountId,
                      item,
                      onComment: () => State.update({ showReply: false }),
                    }}
                  />
                )}

                <H2 className="mt-5 mb-4">{repliesCount.length} Replies</H2>
                <Widget
                  src="dmitriy_sheleg.near/widget/DevSupport.Answer.Feed"
                  props={{ item, admins, adminContract }}
                />
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
      </SidebarWrapper>
    </div>
    {/*{footer}*/}
  </div>
);
