const ownerId = "contribut3.near";
const accountId = props.accountId;
const cid = props.cid;

State.init({
  request: null,
  requestIsFetched: false,
  tags: null,
  tagsIsFetched: false,
  description: null,
  descriptionIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.foundersIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/tags`] },
    "final",
    false
  ).then((tags) => State.update({ tags, tagsIsFetched: true }));
}

if (!state.descriptionIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/description`] },
    "final",
    false
  ).then((description) =>
    State.update({ description, descriptionIsFetched: true })
  );
}

const Title = styled.h3`
font-style: normal;
font-weight: 600;
font-size: 1em;
line-height: 1.4em;
color: #101828;
flex: none;
order: 0;
flex-grow: 1;
`;

const body = (
  <>
    <Title></Title>
    <Widget
      src={`${ownerId}/widget/ProfileLine`}
      props={{
        accountId,
        imageSize: "3em",
        update: props.update,
      }}
    />
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: state.description }}
    />
  </>
);

const FooterButton = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  width: 48%;
  height: 2.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  text-align: center;
  color: ${({ blue }) => (blue ? "#006ADC" : "#101828")};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const footer = (
  <Footer>
    <FooterButton
      href={`/#/${ownerId}/widget/Index?tab=contributor&accountId=${accountId}`}
      onClick={() =>
        props.update({
          tab: "contributor",
          content: "",
          search: "",
          accountId,
        })
      }
    >
      View details
    </FooterButton>
    <FooterButton
      blue
      href={`/#/${ownerId}/widget/Index?tab=create&content=proposal&cid=${cid}&accountId=${accountId}`}
      onClick={() =>
        props.update({
          tab: "create",
          content: "proposal",
          search: "",
          accountId,
          cid,
        })
      }
    >
      Propose contribution
    </FooterButton>
  </Footer>
);

return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
