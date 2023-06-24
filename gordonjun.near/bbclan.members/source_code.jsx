const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "gordonjun.near"; // temporarily

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
  padding: 0 24px;
  border-bottom: 1px solid #eceef0;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const ComposeWrapper = styled.div`
  border-top: 1px solid #eceef0;
`;

return (
  <>
    <div className="m-2">
      <div className="tab-content">
        <h2 className="mb-3">clan members</h2>
        <ComposeWrapper>
          <div className="tab-pane fade in show active" role="tabpanel">
            <Widget
              src="near/widget/FollowersList"
              props={{ accountId: daoId }}
            />
          </div>
        </ComposeWrapper>
      </div>
    </div>
  </>
);
