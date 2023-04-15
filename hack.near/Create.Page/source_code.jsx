const accountId = context.accountId;
const typeTag = props.typeTag;
const template = props.template;

State.init({
  hashtag: "",
});

const createThing = () => {
  Social.set(
    {
      widget: {
        [`${state.hashtag}.Page`]: {
          "": `const hashtag = props.hashtag ?? "${state.hashtag}"; return (<Widget src="${template}" props={{hashtag: hashtag}} />);`,
          metadata: {
            tags: {
              page: "",
              [typeTag]: "",
            },
          },
        },
      },
    },
    {
      force: true,
    }
  );
};

return (
  <div>
    <Widget
      src="contribut3.near/widget/Inputs.Text"
      props={{
        label: "Page Topic",
        placeholder: "#hashtag",
        value: state.hashtag,
        onChange: (hashtag) => State.update({ hashtag }),
      }}
    />
    <div>
      <button onClick={createThing} disabled={state.hashtag === ""}>
        Create
      </button>
    </div>
  </div>
);
