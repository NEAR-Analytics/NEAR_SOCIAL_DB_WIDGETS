State.init({
  tags: {},
});

const tagsArray = state.tags ? Object.keys(state.tags) : undefined;
return (
  <>
    {tagsArray.join(", ")}
    <Widget
      src="mob.near/widget/TagsEditor"
      props={{
        initialTagsObject: state.tags,
        placeholder:
          options.tags.placeholder ??
          "rust, engineer, artist, humanguild, nft, learner, founder",
        setTagsObject: (tags) => {
          state.tags = tags;
          State.update();
        },
      }}
    />
  </>
);
