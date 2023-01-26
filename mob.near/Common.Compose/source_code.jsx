if (state.image === undefined) {
  State.init({
    image: {},
    text: "",
  });

  if (props.onHelper) {
    props.onHelper({
      extractMentions: (text) => {
        const mentionRegex =
          /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
        mentionRegex.lastIndex = 0;
        const accountIds = new Set();
        for (const match of text.matchAll(mentionRegex)) {
          console.log(match);
          if (
            !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
            !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
            match[1].length >= 2 &&
            match[1].length <= 64
          ) {
            accountIds.add(match[1].toLowerCase());
          }
        }
        return [...accountIds];
      },
    });
  }
}

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

const onCompose = () => {
  State.update({
    image: {},
    text: "",
  });
};

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
      <div>{props.composeButton && props.composeButton(onCompose)}</div>
    </div>
  </div>
);
