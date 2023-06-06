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
  Social.get(`${accountId}/question/academy`, blockHeight) ?? "null"
);

const questionUrl = `academy.near/widget/edu.question.page?accountId=${accountId}&blockHeight=${blockHeight}`;
const shareUrl = `#/${questionUrl}`;

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

  @media(max-width: 768px) {
    border-left: none;
  }
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
  <div className="pt-2 pb-5">
    <H4>
      <a href="#/academy.near/widget/edu">
        <i class="bi bi-arrow-left me-2" />
        Go back
      </a>
    </H4>

    <Widget
      src="dev-support.near/widget/DevSupport.Question.PreviewDetailed"
      props={{
        accountId,
        blockHeight,
        admins,
        adminContract,
        question,
      }}
    />
  </div>
);
