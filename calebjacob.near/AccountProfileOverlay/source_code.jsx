const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});

const handleOnMouseEnter = () => {
  State.update({ show: true });
};
const handleOnMouseLeave = () => {
  State.update({ show: false });
};

State.init({
  show: false,
});

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 12px;
  width: 275px;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #ECEEF0;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  padding: 12px;
`;

const FollowButtonWrapper = styled.div`
  width: 100%;
  
  div, button {
    width: 100%;
  }
`;

const overlay = (
  <Card onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
    <Widget
      src="calebjacob.near/widget/AccountProfile"
      props={{ accountId: props.accountId, profile }}
    />

    <Widget src="calebjacob.near/widget/Tags" props={{ tags, scroll: true }} />

    <FollowButtonWrapper>
      <Widget
        src="calebjacob.near/widget/FollowButton"
        props={{ accountId: props.accountId }}
      />
    </FollowButtonWrapper>
  </Card>
);

return (
  <OverlayTrigger
    show={state.show}
    trigger={["hover", "focus"]}
    delay={{ show: 250, hide: 300 }}
    placement="auto"
    overlay={overlay}
  >
    <div
      className="d-inline-flex"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {props.children || "Test"}
    </div>
  </OverlayTrigger>
);
