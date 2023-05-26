const MainWrapper = styled.div`

`;
return (
  <MainWrapper>
    <h1>List and doc for all Progress Table Widgets</h1>
    <p>
      <a
        href="https://near.social/#/7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressTableRender"
        target="_blank"
      >
        ProgressTableRender
      </a>{" "}
      widget has 2 props.
    </p>
    <p>First one is widgetType and it can be 1, 2 or 3</p>
    <p>Second one is hasBackground, it is boolean </p>
    <p>
      <a
        href="https://near.social/#/7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressTableAdminPanel"
        target="_blank"
      >
        Here is the form
      </a>
      where you can add,edit or remove items. It is will open to anyone, so feel
      free to send me accounts for permisions
    </p>
    <h2>First type</h2>
    <Widget
      src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressTableRender"
      props={{ widgetType: 1, hasBackground: true }}
    />
    <h3> No Background</h3>
    <Widget
      src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressTableRender"
      props={{ widgetType: 1, hasBackground: false }}
    />

    <h2>Second type </h2>
    <Widget
      src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressTableRender"
      props={{ widgetType: 2, hasBackground: true }}
    />
    <h3> No Background</h3>
    <Widget
      src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressTableRender"
      props={{ widgetType: 2, hasBackground: false }}
    />

    <h2>Third type </h2>
    <Widget
      src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressTableRender"
      props={{ widgetType: 3, hasBackground: true }}
    />
    <h3> No Background</h3>
    <Widget
      src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressTableRender"
      props={{ widgetType: 3, hasBackground: false }}
    />
  </MainWrapper>
);
