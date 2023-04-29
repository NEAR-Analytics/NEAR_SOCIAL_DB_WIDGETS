const { role } = props;

State.init({ tab: "Templates" });

const Wrapper = styled.div`
  background: #101011;


`;

const Tab = (
  <Widget
    src="ref-admin.near/widget/ref-component-tab"
    props={{
      tab: state.tab,
      changeTab: (newTab) =>
        State.update({
          tab: newTab,
        }),
    }}
  />
);

const content =
  state.tab === "Templates" ? (
    <Widget
      src="ref-admin.near/widget/ref-template-page"
      props={{
        role,
      }}
    />
  ) : (
    <Widget
      src="ref-admin.near/widget/ref-components-page"
      props={{
        role,
      }}
    />
  );

return (
  <Wrapper>
    {Tab}

    {content}
  </Wrapper>
);
