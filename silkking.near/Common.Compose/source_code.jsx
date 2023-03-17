const autocompleteEnabled = props.autocompleteEnabled ?? true;

State.init({
  text: props.initialText || "",
  url: props.url || "",
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

  const extractHashtags = (text) => {
    const hashtagRegex = /#(\w+)/gi;
    hashtagRegex.lastIndex = 0;
    const hashtags = new Set();
    for (const match of text.matchAll(hashtagRegex)) {
      if (
        !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
        !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
      ) {
        hashtags.add(match[1].toLowerCase());
      }
    }
    return [...hashtags];
  };

  const extractMentionNotifications = (text, item) =>
    extractMentions(text || "")
      .filter((accountId) => accountId !== context.accountId)
      .map((accountId) => ({
        key: accountId,
        value: {
          type: "mention",
          item,
        },
      }));

  props.onHelper({
    extractHashtags,
    extractMentions,
    extractTagNotifications: extractMentionNotifications,
    extractMentionNotifications,
  });
}

const content = (state.text || state.url) && {
  type: "md",
  text: state.text,
  url: state.url,
};

if (content && props.extraContent) {
  Object.assign(content, props.extraContent);
}

function autoCompleteAccountId(id) {
  let text = state.text.replace(/[\s]{0,1}@[^\s]*$/, "");
  text = `${text} @${id}`.trim() + " ";
  State.update({ text, showAccountAutocomplete: false });
}

const onChange = (key, text) => {
  const showAccountAutocomplete = /@[\w][^\s]*$/.test(text);
  const update = {};
  update[key] = text;
  State.update({ ...update, showAccountAutocomplete });
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
    text: "",
    url: "",
  });
};

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 5em;
    font: inherit;
    padding: var(--padding) var(--padding) calc(40px + (var(--padding) * 2)) calc(40px + (var(--padding) * 2));
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
`;

return (
  <div className="text-bg-light rounded-4">
    <TextareaWrapper className="p-3" data-value={state.text || ""}>
      <textarea
        value={state.text || ""}
        onInput={(event) => onChange("text", event.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            State.update({ showAccountAutocomplete: false });
          }
        }}
        placeholder={props.placeholder ?? "What's happening?"}
      />
      {autocompleteEnabled && state.showAccountAutocomplete && (
        <div className="pt-1 w-100 overflow-hidden">
          <Widget
            src="mob.near/widget/AccountAutocomplete"
            props={{
              term: state.text.split("@").pop(),
              onSelect: autoCompleteAccountId,
              onClose: () => State.update({ showAccountAutocomplete: false }),
            }}
          />
        </div>
      )}
    </TextareaWrapper>
    <TextareaWrapper className="p-3" data-value={state.url || ""}>
      <textarea
        value={state.url || ""}
        onInput={(event) => onChange("url", event.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            State.update({ showAccountAutocomplete: false });
          }
        }}
        placeholder={props.placeholder2 ?? "Url"}
      />
    </TextareaWrapper>
  </div>
);
