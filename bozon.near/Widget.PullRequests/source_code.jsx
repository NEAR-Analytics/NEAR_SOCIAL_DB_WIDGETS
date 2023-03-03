/*

isOwner: bool,
widgetPath: string,

*/

State.init({
  creation: false,
});

return (
  <div>
    {state.creation ? (
      <div>
        <Widget
          src="bozon.near/widget/Widget.CreatePullRequest"
          props={{
            onClose: () => State.update({ creation: false }),
            props.widgetPath
          }}
        />
      </div>
    ) : (
      <div>
        <button onClick={() => State.update({ creation: true })}>
          Create pull request
        </button>
      </div>
    )}
  </div>
);
