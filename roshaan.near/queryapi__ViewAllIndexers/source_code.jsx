const limit = 7;
let indexers = [];
let totalIndexers = 0;
const registry_contract_id =
  props.registry_contract_id || "registry.queryapi.near";
let accountId = context.accountId;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
`;

if (!accountId) {
  return <H2>Please sign in to see your widgets.</H2>;
}

const indexerDetails = Near.asyncView(
  registry_contract_id,
  "list_indexer_functions"
).then((data) => {
  let indexer_paths = Object.keys(data);
  indexers = indexer_paths
    .map((indexer_path) => {
      return {
        accountId: indexer_path.split("/")[0],
        indexerName: indexer_path.split("/").splice(1).join("/"),
      };
    })
    .filter((indexer) => indexer.accountId === accountId);
});

const CardWrapper = styled.div`
  margin: 0 0 16px;
`;

const sharedButtonStyles = `
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-top: 12px;
  margin-bottom: 12px;
  height: 32px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }

  .bi-16 {
    font-size: 16px;
  }
`;

const Button = styled.button`
  ${sharedButtonStyles}
  color: ${(p) => (p.primary ? "#fff" : "#11181C")} !important;
  background: ${(p) => (p.primary ? "#0091FF" : "#FBFCFD")};
  border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

  &:hover,
  &:focus {
    background: ${(p) => (p.primary ? "#0484e5" : "#ECEDEE")};
  }
`;

const ButtonLink = styled.a`
  ${sharedButtonStyles}
  color: ${(p) => (p.primary ? "#fff" : "#11181C")} !important;
  background: ${(p) => (p.primary ? "#0091FF" : "#FBFCFD")};
  border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

  &:hover,
  &:focus {
    background: ${(p) => (p.primary ? "#0484e5" : "#ECEDEE")};
  }
`;
const Subheading = styled.h2`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;
`;
return (
  <>
    <ButtonLink
      primary
      href="/#/roshaan.near/widget/queryapi__QueryApiDashboard"
    >
      Create New Indexer
    </ButtonLink>
    <H2>Latest Indexers</H2>
    {indexers.map((indexer, i) => (
      <CardWrapper key={i}>
        <Widget
          src="roshaan.near/widget/queryapi__IndexerView"
          props={{
            indexer_path: `${indexer.accountId}/${indexer.indexerName}`,
          }}
        />
      </CardWrapper>
    ))}
    {indexers.length == 0 && (
      <Subheading> You have no indexers to show...</Subheading>
    )}
    {indexers.length > 0 && (
      <ButtonLink href="/#/roshaan.near/widget/queryapi__ViewAllIndexersPublic">
        View All Indexers <span>({totalIndexers})</span>
      </ButtonLink>
    )}
  </>
);
