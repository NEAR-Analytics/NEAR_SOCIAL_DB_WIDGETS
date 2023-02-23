if (!context.accountId || !props.term) return <></>;

let results = [];
const profilesData = Social.get("*/profile/name", "final") || {};
const followingData = Social.get(
  `${context.accountId}/graph/follow/**`,
  "final"
);

if (!profilesData || !followingData) return <></>;

const profiles = Object.entries(profilesData);
profiles.sort((a, b) => {
  if (followingData[a[0]] === "" && followingData[b[0]] !== "") return -1;
  return 0;
});
const term = (props.term || "").replace(/\W/g, "").toLowerCase();
const limit = 5;

for (let i = 0; i < profiles.length; i++) {
  const search = (profiles[i][0] + profiles[i][1]?.profile?.name)
    .replace(/\W/g, "")
    .toLowerCase();

  if (search.indexOf(term) > -1) {
    results.push({
      accountId: profiles[i][0],
    });
  }

  if (results.length === limit) break;
}

function onResultClick(id) {
  props.onSelect && props.onSelect(id);
}

const Wrapper = styled.div`
  background: #fff;
  display: flex;
  gap: 12px;
  padding: 0 12px 12px 12px;
  overflow: auto;
  scroll-behavior: smooth;
  align-items: center;

  > * {
    max-width: 175px;
    flex-grow: 0;
    flex-shrink: 0;
    
    button {
        border: 1px solid #ECEEF0;
        border-radius: 6px;
        padding: 6px;
        transition: all 200ms;

        &:focus, &:hover {
            border-color: #687076;
        }
    }
  }
`;

if (results.length === 0) return <></>;

return (
  <Wrapper>
    {results.map((result) => {
      return (
        <Widget
          key={result.accountId}
          src="calebjacob.near/widget/AccountProfile"
          props={{ accountId: result.accountId, onClick: onResultClick }}
        />
      );
    })}
  </Wrapper>
);
