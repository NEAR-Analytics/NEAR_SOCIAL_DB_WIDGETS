const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const typeStr = "evrything.near/type/Image";

const type = Type.get(typeStr);
// const type = props.type;

if (!type) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: `provided type: "${props.type}" is not valid.`,
      }}
    />
  );
}

State.init({
  img: null,
});

function composeData() {
  const data = {
    thing: {
      main: JSON.stringify({ img: state.img }),
    },
    index: {
      tempeverything: JSON.stringify({
        key: "main",
        value: {
          type: typeStr,
        },
      }),
    },
  };
  return data;
}

return (
  <div className="container row">
    <div>
      Image upload: <br />
      <IpfsImageUpload image={state.img} />
    </div>
    <div>
      Raw State:
      <pre>{JSON.stringify(state)}</pre>
    </div>
    <div className="mt-2">
      {state.img.cid && (
        <img
          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
          alt="uploaded"
        />
      )}
    </div>
    <ButtonRow>
      <CommitButton disabled={!state.img} force data={composeData}>
        create
      </CommitButton>
    </ButtonRow>
  </div>
);
