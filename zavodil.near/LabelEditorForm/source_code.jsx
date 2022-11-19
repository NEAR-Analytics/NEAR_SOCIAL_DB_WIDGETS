// LabelEditorForm
const ownerId = "zavodil.near";
const appName = "nametag";

const initialMetadata = props.initialMetadata ?? {};
const onChange = props.onChange;
const options = props.options;
const contractId = props.contractId ?? ownerId;
const debug = props.debug ?? false;

State.init({
  contractId,
  initialMetadata,
  metadata: initialMetadata,
  reportedMetadata: initialMetadata,
});

const metadata = {
  contractId: state.contractId,
  userTags: state.metadata.userTags ?? undefined,
  tags: options.tags ? state.metadata.tags : undefined,
};

if (
  onChange &&
  JSON.stringify(state.reportedMetadata) !== JSON.stringify(metadata)
) {
  State.update({
    reportedMetadata: metadata,
  });
  onChange(metadata);
}

return (
  <>
    <div className="mb-2">
      Near Account Id:
      <input
        type="text"
        value={state.contractId}
        onChange={(event) => State.update({ contractId: event.target.value })}
      />
    </div>

    {options.tags && (
      <div className="mb-2">
        {options.tags.label ?? "Tags"}
        <Widget
          src={`${ownerId}/widget/TagsEditor`}
          props={{
            contractId: state.contractId,
            initialTagsObject: metadata.userTags,
            tagsPattern: options.tags.pattern,
            placeholder: options.tags.placeholder ?? "label",
            setTagsObject: (tags) => {
              state.metadata.tags = tags;
              State.update();
            },
            debug,
          }}
        />
      </div>
    )}
  </>
);
