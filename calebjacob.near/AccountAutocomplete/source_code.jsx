if (!context.accountId || !props.term) return <></>;

let results = [];
const profilesData = Social.get("*/profile/name", "final") || {};
const followingData = Social.get(
  `${context.accountId}/graph/follow/**`,
  "final"
);

if (!profilesData || !followingData) return <></>;

const profiles = Object.entries(profilesData);
const term = (props.term || "").replace(/\W/g, "").toLowerCase();
const limit = 5;

for (let i = 0; i < profiles.length; i++) {
  let score = 0;
  const accountId = profiles[i][0];
  const accountIdSearch = profiles[i][0].replace(/\W/g, "").toLowerCase();
  const nameSearch = (profiles[i][1]?.profile?.name || "")
    .replace(/\W/g, "")
    .toLowerCase();
  const accountIdSearchIndex = accountIdSearch.indexOf(term);
  const nameSearchIndex = nameSearch.indexOf(term);

  if (accountIdSearchIndex > -1 || nameSearchIndex > -1) {
    score += 10;

    if (accountIdSearchIndex === 0) {
      score += 10;
    }
    if (nameSearchIndex === 0) {
      score += 10;
    }
    if (followingData[accountId] === "") {
      score += 30;
    }

    results.push({
      accountId,
      score,
    });
  }
}

results.sort((a, b) => b.score - a.score);
results = results.slice(0, limit);

function onResultClick(id) {
  props.onSelect && props.onSelect(id);
}

const Wrapper = styled.div`
  background: #ECEEF0;
  display: flex;
  gap: 8px;
  padding: 8px;
  overflow: auto;
  scroll-behavior: smooth;
  align-items: center;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);

  > * {
    max-width: 175px;
    flex-grow: 0;
    flex-shrink: 0;
    
    button {
        border: 1px solid #ECEEF0;
        background: #fff !important;
        border-radius: 6px;
        padding: 3px 6px;
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
          props={{
            avatarSize: "34px",
            accountId: result.accountId,
            onClick: onResultClick,
            overlayPlacement: "bottom",
          }}
        />
      );
    })}
  </Wrapper>
);
