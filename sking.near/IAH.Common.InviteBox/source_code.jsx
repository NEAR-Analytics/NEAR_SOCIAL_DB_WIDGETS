const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  // not logged in
  return <h5 className="text-center">Please login to invite your friends</h5>;
}

State.init({
  invitedId: "",
});

const InviteWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  input {
    min-width: 200px;
    flex: 1;
    background: #020202;
    border: 2px solid #08cc86;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    transition: 0.2s ease;

    &:hover,
    &:focus {
      background: #020202;
      color: #fff;
    }
  }
`;

return (
  <InviteWrapper>
    <input
      type="text"
      placeholder="Enter your friend's NEAR account ID"
      onChange={(e) => {
        State.update({
          invitedId: e.target.value,
        });
      }}
    />
    <Widget
      src="sking.near/widget/IAH.Common.InviteButton"
      props={{
        invitedId: state.invitedId,
        accountId: accountId,
      }}
    />
  </InviteWrapper>
);
