const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
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

const testQuestion = JSON.parse(
  Social.get(`${accountId}/question`, blockHeight) ?? "null"
);

const link = `#/dev-support.near/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}&adminContract=${adminContract}`;

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
const CardWrapper = styled.div`
  z-index: 100;
  padding: 6px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 12px;
  width: 275px;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 12px;
`;
const Item = styled.div`
  padding: 0;
  .btn {
    width: 100%;
    text-align: left;
    &:hover,
    &:focus {
      background-color: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    &.report-btn, &.hide-btn {
      i {
        color: #7E868C;
      }
    }
    span {
      font-weight: 500;
    }
  }
`;
const Button = styled.a`
  display: block;
  color: #ffffff;
  background-color: #30A46C;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
  float: inline-end;

  :hover{ color: #ffffff; cursor: pointer; }
`;

return (
  <div class="row">
    <div class="col-sm-1 col-2 d-flex">
      <Widget
        src="ethpraguedemo.near/widget/Progress-Pool-Question-Button-Upvote"
        props={{ accountId, blockHeight }}
      />
      <Widget
        src="ethpraguedemo.near/widget/Progress-Pool-Question-Button-Downvote"
        props={{ accountId, blockHeight }}
        style="margin-left: 2px;"
      />
    </div>
    <div class="col-10">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              <H2>
                <a href={link}>{question.title}</a>
                <i class="bi bi-arrow-right" />
              </H2>
            </div>
            <div class="col-auto">
              <div class="dropdown ms-auto">
                <ul class="dropdown-menu">
                  <li>
                    <Item>
                      <Widget
                        src="dima_sheleg.near/widget/DevSupport.Question.Button.Flag"
                        props={{
                          accountId,
                          blockHeight,
                          className: "btn report-btn",
                        }}
                      />
                    </Item>
                  </li>
                  <li>
                    <Item>
                      {/* Delete widget */}
                      <Widget
                        src="dima_sheleg.near/widget/DevSupport.Question.Button.Delete"
                        props={{
                          accountId,
                          blockHeight,
                          admins,
                          adminContract,
                          className: "hide-btn",
                          text: "Hide",
                        }}
                      />
                    </Item>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Widget
            src="dev-support.near/widget/DevSupport.Question.Button.Answers"
            props={{ accountId, blockHeight, adminContract }}
          />
        </div>
      </div>
    </div>

    
  </div>

<div class="col-lg-4 col-sm-12">
      <Button
        class="btn btn-primary"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        Ask a Question
      </Button>
    </div>

);
