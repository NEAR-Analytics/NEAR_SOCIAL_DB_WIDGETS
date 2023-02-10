const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  border: 1px solid #ECEEF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
`;

const CardBody = styled.div`
  padding: 16px;
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #ECEEF0;
`;

const Title = styled.p`
  font-size: 14px;
  line-height: 17px;
  color: #101828;
  margin: 0;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Thumbnail = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;

  img {
    box-shadow: inset 0 0 0 1px #ECEEF0;
    border-radius: 8px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 16px;

  > * {
      min-width: 0;
  }
`;

const TagsWrapper = styled.div`
  position: relative;

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
  padding: 6px 16px 0 0;

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
  color: ${(props) => (props.primary ? "#006ADC" : "#11181C")} !important;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }
`;

console.log(props.app);

return (
  <Card>
    <CardBody>
      <Flex>
        <Thumbnail>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: props.app.metadata.image,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
              alt: props.app.metadata.name,
            }}
          />
        </Thumbnail>

        <div>
          <Title>{props.app.metadata.name || props.app.widgetName}</Title>
          <TagsWrapper>
            <Tags>
              <Tag>profile</Tag>
              <Tag>editor</Tag>
              <Tag>social</Tag>
              <Tag>profile</Tag>
              <Tag>editor</Tag>
              <Tag>social</Tag>
            </Tags>
          </TagsWrapper>
        </div>
      </Flex>
    </CardBody>

    <CardFooter>
      <ButtonLink href="/">View Details</ButtonLink>
      <ButtonLink href="/" primary>
        Open
      </ButtonLink>
    </CardFooter>
  </Card>
);
