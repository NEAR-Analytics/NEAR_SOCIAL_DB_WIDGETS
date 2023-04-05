const ownerId = "contribut3.near";

const availableContent = ["projects", "contributors", "requests"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "projects";
  }

  return content;
};

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "home",
      content: getContent(props.content),
      search: props.search,
      update: props.update,
      buttons: [
        {
          id: "projects",
          text: "Projects",
        },
        {
          id: "vendors",
          text: "Vendors",
        },
        {
          id: "backers",
          text: "Backers",
        },
        {
          id: "requests",
          text: "Requests",
        },
      ],
    }}
  />
);

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/EntityList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  contributors: (
    <Widget
      src={`${ownerId}/widget/ContributorList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
}[getContent(props.content)];

const header = (
  <div>
    <h1 className="fs-3">Find projects, contributors or requests</h1>
  </div>
);

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 2em;
    color: #101828;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1.5em;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
  }
`;

return (
  <Container>
    <Heading>
      <h1>Discover NEAR Horizon</h1>
      <h2>Explore projects, vendors, investors and contribution requests</h2>
    </Heading>
    <div>{contentSelector}</div>
    <Filter>
      <Widget
        src={`${ownerId}/widget/SearchInput`}
        props={{ search: props.search, update: props.update }}
      />
      <div>
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Type",
            options: [
              { id: "verified", text: "Verified", href: "#" },
              { id: "not-verified", text: "Not verified", href: "#" },
            ],
            selected: "verified",
            update: (id) => alert(id),
          }}
        />
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Status",
            options: [
              { id: "active", text: "Active", href: "#" },
              { id: "not-active", text: "Not active", href: "#" },
            ],
            selected: "active",
            update: (id) => alert(id),
          }}
        />
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Sort by",
            options: [
              { id: "name", text: "Name", href: "#" },
              { id: "id", text: "Account ID", href: "#" },
            ],
            selected: "name",
            update: (id) => alert(id),
          }}
        />
      </div>
    </Filter>
    <div>{content}</div>
  </Container>
);
