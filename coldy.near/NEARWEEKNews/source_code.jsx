const data = fetch(
  "https://learnnear.club/wp-json/wp/v2/posts?meta_key=shared_with_boss&meta_value=yes&limit=10",
  {
    //subscribe: true,
    method: "GET",
  }
);

const Wrapper = styled.div`
  display: grid;
  gap: 2px;
`;
const GuideListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GuideListItem = styled.div`
  width: 33.33%;
  padding: 0 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const GuideImage = styled.img`
  width: 100%;
  height: auto;
`;

const GuideCategory = styled.div`
  margin-top: 10px;
  font-weight: bold;
  text-transform: uppercase;
`;

const GuideTitle = styled.div`
  margin-top: 5px;
  font-weight: bold;
`;

const H1 = styled.h2`
  text-align:center;
  color: #11181C;
  margin: 0;
`;

const ButtonLink = styled.a`
  display: block;
  width: 100%;
  padding: 9px;
  height: 36px;
  border-color: #00c08b;
  background-color: #00c08b;
  border: 1px solid #D7DBDF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  margin: 0;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }
`;
console.log(data.body);

return (
  <div>
    {data.body !== null ? (
      <Wrapper>
        <H1>LNC Recomended Guides</H1>
        <GuideListWrapper>
          {data.body.map((guide) => (
            <GuideListItem key={guide.id}>
              <GuideImage src={guide.featured_image_src} alt={guide.title} />
            </GuideListItem>
          ))}
        </GuideListWrapper>
        <ButtonLink href="https://nearweek.com" target="_blank">
          View All Guides
        </ButtonLink>
      </Wrapper>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
