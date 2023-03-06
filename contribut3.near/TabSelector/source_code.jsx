const ownerId = "contribut3.near";
const buttons = props.buttons ?? [];
const tab = props.tab;
const accountId = props.accountId;
const content = props.content;
const cid = props.cid;

const TabItem = styled.a`
  position: relative;
  color: #344054;
  cursor: pointer;
  font-weight: 500;
  font-size: 1em;
  padding: 0.5em;
  margin: 0.25em 0;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  background-color: ${({ selected }) => (selected ? "#f2f4f7" : "white")};

  &:hover {
    color: #667085;
    text-decoration: none;
    background-color: #f9fafb;
  }
`;

const CountIndicator = styled.div`
  display: ${({ show }) => (show ? "inline-block" : "none")};
  border-radius: 100%;
  background-color: #f04438;
  min-width: 1.5em;
  min-height: 1.5em;
  color: white;
  text-align: center;
  position: absolute;
  inset: auto 0.5em auto auto;
`;

return (
  <div className="btn-group" role="group" aria-label="Content Tab Selector">
    {buttons.map(({ id, text, icon, count }) => (
      <a
        className={`btn ${props.content === id ? "btn-secondary" : "btn-outline-secondary"
          }`}
        href={`/#/${ownerId}/widget/Index?tab=${tab}&content=${id}${props.search ? "&search=" + props.search : ""
          }${accountId ? "&accountId=" + accountId : ""}${cid ? "&cid=" + cid : ""
          }`}
        onClick={() =>
          props.update({
            tab,
            content: id,
            search: props.search,
            accountId,
            cid,
          })
        }
        key={id}
      >
        <i className={icon} />
        <span>{text}</span>

        <CountIndicator show={!!count && count > 0}>{count}</CountIndicator>
      </a>
    ))}
  </div>
);
