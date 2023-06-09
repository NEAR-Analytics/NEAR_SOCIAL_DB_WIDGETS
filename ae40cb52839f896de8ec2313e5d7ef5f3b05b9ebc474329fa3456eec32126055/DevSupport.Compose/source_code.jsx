if (state.image === undefined) {
  State.init({
    image: {},
    text: props.initialText || "",
  });

  if (props.onHelper) {
    const extractMentions = (text) => {
      const mentionRegex =
        /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
      mentionRegex.lastIndex = 0;
      const accountIds = new Set();
      for (const match of text.matchAll(mentionRegex)) {
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
    };
    const extractTagNotifications = (text, item) =>
      extractMentions(text || "").map((accountId) => ({
        key: accountId,
        value: {
          type: "mention",
          item,
        },
      }));

    props.onHelper({
      extractMentions,
      extractTagNotifications,
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
  <div>
    <div className="py-2">
      <textarea
        className="form-control border-1"
        style={{ "min-height": "30vh" }}
        value={state.text || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={props.placeholder ?? "What's happening?"}
      />
    </div>
    <div className="d-flex flex-row p-2 border-top">
      <div className="flex-grow-1">
        Include an Image:
        <IpfsImageUpload
          image={state.image}
          className="btn btn-outline-secondary border-1"
        />
      </div>
      <div>{props.composeButton && props.composeButton(onCompose)}</div>
    </div>
  </div>
);
