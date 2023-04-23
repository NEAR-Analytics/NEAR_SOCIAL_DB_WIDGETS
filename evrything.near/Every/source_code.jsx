/**
 * Configure your community feed.
 */
// const daoId = "liberty.sputnik-dao.near"; // restrict posting to members of a DAO (Optional)
// const groupId = "community"; // which group can post?

// const policy = Near.view(daoId, "get_policy");
// const group = policy.roles
//   .filter((role) => role.name === groupId)
//   .map((role) => {
//     const group = role.kind.Group;

//     return group;
//   });

const defaultTag = props.defaultTag || "earthday";

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

const font = props.font || "Times New Roman";
State.init({
  title: "everything",
  hashtagsFilter: hashtags[0],
  selectedType: "posts",
});

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
        </div>
      </Controller>
      {state.selectedType === "posts" ? (
        <Widget
          src="efiz.near/widget/Community.Posts"
          props={{
            communityHashtags: [state.hashtagsFilter],
            communityMembers: [],
            exclusive: false,
            allowPublicPosting: true,
          }}
        />
      ) : (
        <Widget src="evrything.near/widget/Everything.ViewAll.Events" />
      )}
    </Container>
  </>
);
