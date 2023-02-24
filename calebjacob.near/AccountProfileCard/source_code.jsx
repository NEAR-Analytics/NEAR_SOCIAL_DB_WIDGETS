const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});

State.init({
  show: false,
});

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 12px;
  width: 100%;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #ECEEF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 12px;
`;

const FollowButtonWrapper = styled.div`
  width: 100%;
  
  div, button {
    width: 100%;
  }
`;

return (
  <Card>
    <Widget
      src="calebjacob.near/widget/AccountProfile"
      props={{
        accountId: props.accountId,
        blockHeight: props.blockHeight,
        profile,
        noOverlay: true,
      }}
    />

    <Widget src="calebjacob.near/widget/Tags" props={{ tags, scroll: true }} />

    {!!context.accountId && context.accountId !== props.accountId && (
      <FollowButtonWrapper>
        <Widget
          src="calebjacob.near/widget/FollowButton"
          props={{ accountId: props.accountId }}
        />
      </FollowButtonWrapper>
    )}
  </Card>
);
