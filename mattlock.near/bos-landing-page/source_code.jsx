return (
  <>
    <div
      style={{
        position: "relative",
        minHeight: 400,
        width: "1200px",
        marginBottom: 16,
      }}
    >
      <img
        style={{ position: "absolute", top: 0, left: 0, height: "400px" }}
        src="https://ipfs.io/ipfs/bafybeiex4lbkhkgwjss4uxcjfoxctbonloyb4ncssqmd7l6hyamfobkd2e"
      />

      <img
        style={{ position: "absolute", top: 0, right: 0, height: "400px" }}
        src="https://ipfs.io/ipfs/bafybeibeet4pahva4b6nbgl45bxz52qrhtt3zxihkyyxvwsneogdjzqs5a"
      />
    </div>

    <div>
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            limit: 10,
            term: "",
            filterTag: "ETHDenver2023",
            onChange: ({ result: components, term }) =>
              State.update({ components, term }),
          }}
        />
      </div>
      {state.components && state.components.length > 0 && (
        <div className="mb-2">
          {state.components.map((component, i) => (
            <div key={i}>
              <Widget
                src="mob.near/widget/Editor.ComponentSearch.Item"
                props={{
                  accountId: component.accountId,
                  widgetName: component.widgetName,
                  onEmbed: () => State.update({ components: null }),
                  onHide: () => State.update({ components: null }),
                  extraButtons: props.extraButtons,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);
