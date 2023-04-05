const data = fetch(
  "https://nearweek.com/api/dao-news?populate=deep&sort=createdAt:desc&pagination[pageSize]=5",
  {
    //subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization:
        "Bearer 15699f0723aa9fe9f655b1a94e450552476c08807f67b525b5a3c8011eecc8aee6d45923443620f17815b897858be058cd7bd89ddf23a28aabaecb178e7ebc55d380293beeb51a8ce87b40e1518ce4708e4d51a06b115f27fa64ab5cbee5a3511cec785d7ae6a155ecd05ac8196aadae3e9b8e9401b8df8d8b69904f7364f925",
    },
  }
);

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0;
`;

const Items = styled.ul`
  list-style: disc;
  padding-left: 16px;
  margin: 0;
  color: #687076;
`;

const Item = styled.li`
  width: 100%;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  > * {
    min-width: 0
  }
`;

const Text = styled.span`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};

  &[href] {
    &:hover,
    &:focus {
      outline: none;
      text-decoration: underline;
    }
  }
`;

const ButtonLink = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181C !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }
`;

console.log(data);
const news = data.body.data;
const nwSite = "https://nearweek.com";

function dateToDays(date) {
  const timeAgo = (diffSec) =>
    diffSec < 60000
      ? `${(diffSec / 1000) | 0}s`
      : diffSec < 3600000
      ? `${(diffSec / 60000) | 0}m`
      : diffSec < 86400000
      ? `${(diffSec / 3600000) | 0}h`
      : `${(diffSec / 86400000) | 0}d`;

  var d = new Date(date);
  return timeAgo(Date.now() - d.getTime());
}

return (
  <div>
    {data !== null ? (
      <Wrapper>
        <H2>News</H2>
        {news.map((item, i) => (
          <>
            <div class="d-flex">
              <img
                class="rounded"
                width="60"
                height="60"
                src={nwSite + item.Thumbnail.url}
                alt={news.Thumbnail.alternativeText}
              />
              <div class="align-text-bottom d-flex flex-wrap m-2">
                <Text as="a" href={item.sourceUrl} target="_blank" bold>
                  {item.Title}
                </Text>
                <div class="align-text-top d-flex flex-wrap m-2 float-end">
                  <Text small>{dateToDays(item.createdAt)} ago</Text>
                </div>
              </div>
            </div>
          </>
        ))}

        <ButtonLink href="https://nearweek.com" target="_blank">
          View All News
        </ButtonLink>
      </Wrapper>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
