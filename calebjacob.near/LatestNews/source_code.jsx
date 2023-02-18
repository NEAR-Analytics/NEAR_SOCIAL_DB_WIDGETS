const accountId = "calebjacob.near";
const limit = 5;

const posts =
  Social.index("post", "main", {
    accountId,
    limit,
    order: "desc",
  }) || [];

let news = [];

if (posts?.length > 0) {
  news = [];

  posts.forEach((post) => {
    const data = Social.get(`${post.accountId}/post/main`, post.blockHeight);

    if (data) {
      const json = JSON.parse(data);
      console.log(json);
      // news.push({
      //     title: data.
      // });
    }
  });
}

const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 12px;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 2fr 36px 2fr;
  gap: 12px;
  align-items: center;
  width: 100%;
  overflow: hidden;

  > * {
    min-width: 0
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 10px;
  line-height: 14px;
  color: #687076;
  font-weight: 400;
  flex-shrink: 0;
  white-space: nowrap;
  text-align: center;
  overflow: hidden;

  i {
    font-size: 16px;
  }
`;

console.log(posts);

return (
  <Wrapper>
    <H2>News</H2>

    {posts.map((item, i) => (
      <Item key={i} />
    ))}
  </Wrapper>
);
