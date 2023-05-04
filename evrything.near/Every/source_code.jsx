/**
 * Configure your community feed.
 */

const defaultTag = props.defaultTag || "everything";

const hashtags = [
  { name: "everything", required: true },
  { name: "nyc", required: true },
  { name: "earthday", required: true },
  { name: "bos", required: true },
  { name: "dev", required: true },
];

const options = hashtags.map((hashtag) => ({
  label: hashtag.name,
  value: hashtag,
}));

const defaultOption = options.find((option) => option.label === defaultTag);
const defaultFilter = hashtags.find((hashtag) => hashtag.name === defaultTag);

const font = props.font || "Times New Roman";
State.init({
  title: "everything",
  hashtagsFilter: defaultFilter,
  selectedType: "posts",
});

const renderThings = () => {
  switch (state.selectedType) {
    case "posts":
      return (
        <Widget
          src="efiz.near/widget/Community.Posts"
          props={{
            communityHashtags: [state.hashtagsFilter],
            communityMembers: [],
            exclusive: false,
            allowPublicPosting: true,
          }}
        />
      );
    case "events":
      return <Widget src="evrything.near/widget/Everything.ViewAll.Events" />;
    case "climateclock":
      return <Widget src="earthday.near/widget/ClimateClock" />;
  }
};

const H1 = styled.h1`
  font-family: ${font}, Times, serif;
  font-size: 4em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Controller = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 160px 0;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 4px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

return (
  <>
    <Container>
      <div className="mt-auto py-3">
        <div className="container">
          <div className="d-flex justify-content-end">
            <a href={"/#/evrything-docs.near/widget/Everything.Documentation"}>
              <Button>documentation</Button>
            </a>
          </div>
        </div>
      </div>
      <Controller>
        <Typeahead
          size="large"
          bsPrefix={null}
          inputProps={{
            style: {
              border: "none",
              outline: "none",
              boxShadow: "none !important",
              height: "3rem",
              fontSize: "2rem",
              fontFamily: `${font}, Times, serif`,
              lineHeight: 1.5,
              fontWeight: 400,
              cursor: pointer,
              width: "auto",
              textAlign: "center",
            },
          }}
          defaultSelected={[defaultOption]}
          options={options}
          multiple={false}
          onChange={(val) => {
            const [{ value }] = val;
            const { name, required } = value;
            State.update({
              hashtagsFilter: {
                name,
                required,
              },
            });
          }}
          renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
            <input
              {...inputProps}
              ref={(ref) => {
                inputRef(ref);
                referenceElementRef(ref);
              }}
              placeholder="everything"
            />
          )}
        />
        <div className="d-inline-block">
          <Button onClick={() => State.update({ selectedType: "posts" })}>
            posts
          </Button>
          <Button onClick={() => State.update({ selectedType: "events" })}>
            events
          </Button>
          {state.hashtagsFilter.name === "earthday" ? (
            <Button
              onClick={() => State.update({ selectedType: "climateclock" })}
            >
              climate clock
            </Button>
          ) : null}
        </div>
      </Controller>
      {renderThings()}
    </Container>
  </>
);
