const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "bbclan.near";

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

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

return (
  <>
    <div className="m-2">
      <div className="tab-content">
        <h2 className="mb-3">clan members</h2>
        {accountId && (
          <div className="mt-3 mb-4">
            <Widget
              src="nycdao.near/widget/nyc.subscribe"
              props={{ accountId, daoId }}
            />
          </div>
        )}
        <ComposeWrapper>
          <br />
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
