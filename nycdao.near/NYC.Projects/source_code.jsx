const accountId = props.accountId ?? context.accountId;
const tag = props.domain ?? "nyc";

const limitPerPage = 20;
let components = [];

State.init({
  currentPage: 0,
});

const data = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
});

if (data) {
  components = [];

  Object.keys(data).forEach((accountId) => {
    return Object.keys(data[accountId].widget).forEach((widgetName) => {
      components.push({
        accountId,
        widgetName,
        blockHeight: data[accountId].widget[widgetName],
      });
    });
  });

  components.sort((a, b) => b.blockHeight - a.blockHeight);
  components = components.slice(
    0,
    state.currentPage * limitPerPage + limitPerPage
  );
}

const showLoadMoreButton = components.length % limitPerPage === 0;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;

  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const CardWrapper = styled.div``;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181c !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
  }
`;

if (data !== null && components.length === 0) {
  return <Text>This account has not published any components yet.</Text>;
}

return (
  <Wrapper>
    <div>
      <h5>Explore</h5>
      <div>
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            boostedTag: { tag },
            placeholder: "🔍 Search Components",
            limit: 10,
            onChange: ({ result }) => {
              State.update({ apps: result });
            },
          }}
        />
      </div>
      {state.apps && (
        <div>
          {state.apps.map((app, i) => (
            <div key={i}>
              <Widget
                src="mob.near/widget/ComponentSearch.Item"
                props={{
                  link: `#/${app.widgetSrc}`,
                  accountId: app.accountId,
                  widgetName: app.widgetName,
                  onHide: () => State.update({ apps: null }),
                  extraButtons: ({ widgetPath }) => (
                    <a
                      target="_blank"
                      className="btn btn-outline-secondary"
                      href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
                    >
                      Source
                    </a>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: tag, limit: 39 }} />
    <Items>
      {components.map((component, i) => (
        <Widget
          src="adminalpha.near/widget/ComponentCard"
          props={{
            src: `${component.accountId}/widget/${component.widgetName}`,
            blockHeight: component.blockHeight,
          }}
        />
      ))}
    </Items>

    {showLoadMoreButton && (
      <Button
        type="button"
        onClick={() => State.update({ currentPage: state.currentPage + 1 })}
      >
        Load More
      </Button>
    )}
  </Wrapper>
);
