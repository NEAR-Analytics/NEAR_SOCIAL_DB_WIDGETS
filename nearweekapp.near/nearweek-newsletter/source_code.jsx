const data = fetch(
  "https://nearweek.com/api/editions?populate=deep&sort=createdAt:desc&pagination[pageSize]=1",
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

const ButtonLink = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  height: 36px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181C;
  margin: 0;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }
`;

function formatDate(dateString) {
  const date = new Date(dateString);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = dayNames[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek} ${dayOfMonth} ${month}, ${year}`;
}

console.log(data);

const issue = data.body.data[0];
const nwSite = "https://nearweek.com";

return (
  <div className="">
    {issue !== null ? (
      <p>
        <div class="d-flex clearfix">
          <div class="d-flex">
            <img
              class="rounded"
              width="90"
              height="90"
              src={nwSite + issue.Thumbnail.url}
              alt={issue.Thumbnail.alternativeText}
            />
            <div class="d-flex flex-column ms-2 mt-0">
              <div>
                <b>A weekly update on everything that moves NEAR Protocol</b>
              </div>
              <div class="mt-2">
                {" "}
                NO {issue.Number ? issue.Number : ""} ·{" "}
                {issue.publishedAt ? formatDate(issue.publishedAt) : ""}
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-2">
          <div class="d-flex flex-fill p-2">
            <ButtonLink
              href={"https://nearweek.com/newsletters/" + issue.slug}
              target="_blank"
            >
              Read
            </ButtonLink>
          </div>
          <div class="d-flex  flex-fill p-2">
            <ButtonLink href="https://subscribe.nearweek.com" target="_blank">
              <span style={{ color: "#2A6BD5" }}>Subscribe</span>
            </ButtonLink>
          </div>
        </div>
      </p>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
