//roshaan.near/NearSocialIndexer
const [accountId, indexerName] = props.indexer_path.split("/");
// const registry_contract_id =
//   props.registry_contract_id || 'registry.queryapi.near';
// const indexerDetails = Near.asyncView(
//   registry_contract_id,
//   'read_indexer_function',
//   {
//     name: indexer_function_name,
//   }
// );
const indexerEditorUrl = `/#/roshaan.near/widget/query_api__QueryApiDashboard?indexer_path=${accountId}/${indexerName}`;

const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;

  > * {
    min-width: 0;
  }
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const TextLink = styled.a`
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

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const Thumbnail = styled.a`
  display: block;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 1px solid #eceef0;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  transition: border-color 200ms;

  &:focus,
  &:hover {
    border-color: #d0d5dd;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  background: #fbfcfd;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }
`;

return (
  <Card>
    <CardBody>
      <Thumbnail href={indexerEditorUrl}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: metadata.image,
            fallbackUrl:
              "https://upload.wikimedia.org/wikipedia/commons/8/86/Database-icon.svg",
            alt: "Near QueryApi indexer",
          }}
        />
      </Thumbnail>

      <div>
        <TextLink as="a" href={indexerEditorUrl} bold ellipsis>
          {indexerName}
        </TextLink>
        <TextLink as="a" href={indexerEditorUrl} ellipsis>
          @{accountId}
        </TextLink>
      </div>
    </CardBody>

    <CardFooter>
      <ButtonLink href={indexerEditorUrl}>View Details</ButtonLink>
      <ButtonLink href={indexerEditorUrl} primary>
        Edit Indexer
      </ButtonLink>
    </CardFooter>
  </Card>
);
