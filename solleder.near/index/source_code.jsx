const CONTRACT_OWNER = "solleder.near";
const accountId = props.accountId ?? context.accountId;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

return (
  <div>
    <h1>Events</h1>
    <a
      href={`#/${CONTRACT_OWNER}/widget/new_event?accountId=${accountId}`}
      className="TODO"
    >
      <Button>Create new Event</Button>
    </a>

    <a
      href={`#/${CONTRACT_OWNER}/widget/index__list_container?accountId=${accountId}`}
      className="TODO"
    >
      <Button>My events</Button>
    </a>

    <Widget src={`${CONTRACT_OWNER}/widget/index__list_container`} props={{}} />
  </div>
);
