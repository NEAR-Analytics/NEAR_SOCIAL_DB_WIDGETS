const ownerId = "contribut3.near";
const accountId = props.accountId;
const cid = props.cid;

State.init({
  request: null,
  requestIsFetched: false,
  tags: null,
  tagsIsFetched: false,
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

const Deadline = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: .4em;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-style: normal;
  font-weight: 500;
  font-size: .75em;
  line-height: 1em;
  color: #11181C;
`;

const body = (
  <>
    <Widget
      src={`${ownerId}/widget/ProfileLine`}
      props={{
        accountId,
        imageSize: "3em",
        update: props.update,
      }}
    />
    <Title>{state.request.title}</Title>
    <Widget
      src={`${ownerId}/widget/ActiveIndicator`}
      props={{
        active: state.request.open,
        activeText: "Open to proposals",
        inactiveText: "Closed",
      }}
    />
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: state.request.description }}
    />
    <Widget
      src={`${ownerId}/widget/Tags`}
      props={{ tags: state.request.tags.reduce((ob, tag) => ({ ...ob, [tag]: "" }), {}) }}
    />
    <Deadline>
      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 14.75L1 2M1 8.75H6.55C6.97004 8.75 7.18006 8.75 7.34049 8.66825C7.48161 8.59635 7.59635 8.48161 7.66825 8.34049C7.75 8.18006 7.75 7.97004 7.75 7.55V2.45C7.75 2.02996 7.75 1.8199
4 7.66825 1.65951C7.59635 1.51839 7.48161 1.40365 7.34049 1.33175C7.18006 1.25 6.97004 1.25 6.55 1.25H2.2C1.77996 1.25 1.56994 1.25 1.40951 1.33175C1.26839 1.40365 1.15365 1.51839 1.08175 1
.65951C1 1.81994 1 2.02996 1 2.45V8.75ZM7.75 2.75H12.55C12.97 2.75 13.1801 2.75 13.3405 2.83175C13.4816 2.90365 13.5963 3.01839 13.6683 3.15951C13.75 3.31994 13.75 3.52996 13.75 3.95V9.05C1
3.75 9.47004 13.75 9.68006 13.6683 9.84049C13.5963 9.98161 13.4816 10.0963 13.3405 10.1683C13.1801 10.25 12.97 10.25 12.55 10.25H8.95C8.52996 10.25 8.31994 10.25 8.15951 10.1683C8.01839 10.
0963 7.90365 9.98161 7.83175 9.84049C7.75 9.68006 7.75 9.47004 7.75 9.05V2.75Z" stroke="#7E868C" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </Deadline>
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


