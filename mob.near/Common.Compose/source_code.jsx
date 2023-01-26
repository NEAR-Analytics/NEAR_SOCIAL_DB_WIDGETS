State.init({
  image: {},
  text: "",
});

const content = (state.text || state.image.cid) && {
  type: "md",
  text: state.text,
  image: state.image.cid ? { ipfs_cid: state.image.cid } : undefined,
};

const onChange = (text) => {
  State.update({
    text,
  });
};

const jContent = JSON.stringify(content);
if (props.onChange && jContent !== state.jContent) {
  State.update({
    jContent,
  });
  props.onChange({ content });
}

return (
  <div className="text-bg-light rounded-4">
    <div className="p-2">
      <textarea
        className="form-control border-0 text-bg-light w-100"
        value={state.text || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={props.placeholder ?? "What's happening?"}
      />
    </div>
    <div className="d-flex flex-row p-2 border-top">
      <div className="flex-grow-1">
        <IpfsImageUpload
          image={state.image}
          className="btn btn-outline-secondary border-0 rounded-3"
        />
      </div>
      <div>
        <CommitButton
          disabled={!content}
          force
          className="btn btn-dark rounded-3"
          data={() => props.composeData({ content })}
          onCommit={() => {
            State.update({
              image: {},
              text: "",
            });
            props?.onCompose();
          }}
        >
          {props.composeText || "Compose"}
        </CommitButton>
      </div>
    </div>
  </div>
);
