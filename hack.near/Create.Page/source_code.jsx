const accountId = context.accountId;
const typeTag = props.typeTag ?? "page";
const template = props.template;

State.init({
  hashtag: state.hashtag,
});

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const Context = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

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
  <Page>
    <div className="d-flex flex-column col-lg-3">
      <h3 className="mb-2 mt-2">{typeTag} topic:</h3>
      <input type="text" placeholder="your #tag here" value={state.hashtag} />
      <button
        className="mt-2 btn btn-outline-primary"
        onClick={createThing}
        disabled={state.hashtag === ""}
      >
        create
      </button>
    </div>
  </Page>
);
