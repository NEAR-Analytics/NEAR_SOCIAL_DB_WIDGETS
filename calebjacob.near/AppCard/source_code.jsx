const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);
const tags = Object.keys(metadata.tags || {});

const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  border: 1px solid #ECEEF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
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
  border-top: 1px solid #ECEEF0;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
`;

const Thumbnail = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 1px solid #ECEEF0;
  border-radius: 8px;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const TagsWrapper = styled.div`
  position: relative;
  padding: 0 16px 16px;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 16px;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Tags = styled.ul`
  display: flex;
  list-style: none;
  gap: 6px;
  overflow: auto;
  margin: 0;
  padding: 0 16px 0 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tag = styled.li`
  border: 1px solid #E6E8EB;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  color: #687076;
  font-weight: 500;
`;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }
`;

return (
  <Card>
    <CardBody>
      <Thumbnail>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: metadata.image,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
            alt: metadata.name,
          }}
        />
      </Thumbnail>

      <div>
        <Text bold ellipsis>
          {metadata.name || widgetName}
        </Text>

        <Text ellipsis small>
          @{accountId}
        </Text>
      </div>
    </CardBody>

    {tags.length > 0 && (
      <TagsWrapper>
        <Tags>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </Tags>
      </TagsWrapper>
    )}

    <CardFooter>
      <ButtonLink
        href={`/#/calebjacob.near/widget/AppDetailsPage?src=${accountId}/widget/${widgetName}`}
      >
        View Details
      </ButtonLink>
      <ButtonLink href={`/#/${accountId}/widget/${widgetName}`} primary>
        Open
      </ButtonLink>
    </CardFooter>
  </Card>
);
