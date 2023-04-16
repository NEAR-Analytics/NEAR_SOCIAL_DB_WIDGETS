const accountId = context.accountId;
const typeTag = props.typeTag;
const template = props.template;

State.init({
  hashtag: state.hashtag ?? typeTag,
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
    <div className="mb-2 mt-2">
      <input type="text" value={state.hashtag} />
    </div>
    <div>
      <button onClick={createThing} disabled={state.hashtag === ""}>
        Create
      </button>
    </div>
  </div>
);
