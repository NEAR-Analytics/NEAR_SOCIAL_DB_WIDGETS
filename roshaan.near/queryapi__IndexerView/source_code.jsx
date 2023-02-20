const indexerName = props.indexerName;
const accountId = props.accountId;
if (!indexerName || !accountId) return "";
const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  border: ${(div) => (div.selected ? "1px solid black" : "1px solid #eceef0")};
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
const editUrl = `https://near.social/#/roshaan.near/widget/queryapi__QueryApiDashboard?indexer_path=${accountId}/${indexerName}&view=editor-window`;
const statusUrl = `https://near.social/#/roshaan.near/widget/queryapi__QueryApiDashboard?indexer_path=${accountId}/${indexerName}&view=indexer-status`;
return (
  <Card>
    <CardBody>
      <Thumbnail>
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
        <TextLink as="a" bold ellipsis>
          {indexerName}
        </TextLink>
        <TextLink as="a" ellipsis>
          @{accountId}
        </TextLink>
      </div>
    </CardBody>

    <CardFooter>
      <ButtonLink href={statusUrl} target="_blank">
        View Status
      </ButtonLink>
      <ButtonLink primary href={editUrl} target="_blank">
        View Indexer Code
      </ButtonLink>
    </CardFooter>
  </Card>
);
