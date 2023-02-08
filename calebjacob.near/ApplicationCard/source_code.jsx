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
    object-fit: cover;
    border-radius: 8px;
    width: 100%;
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
    width: 20px;
    background: linear-gradient(to left, red, white);
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
  padding: 6px 0 0 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 20px;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
    position: absolute;
    top: 0;
    right: 0;
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

return (
  <Card>
    <CardBody>
      <Flex>
        <Thumbnail>
          <img src="https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreiasfn5ydi54dolw33uzesvf6gycp437cnokgyv3q3spdz6jeefpma" />
        </Thumbnail>

        <div>
          <Title>Real Time Message</Title>
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
      <Title>Real Time Message</Title>
    </CardFooter>
  </Card>
);
