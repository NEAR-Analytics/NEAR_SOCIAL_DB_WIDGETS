const autocompleteEnabled = props.autocompleteEnabled || true;
const withProfileImage = props.withProfileImage;
const composeButton = props.composeButton;
const accountId = props.accountId;

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

function textareaInputHandler(value) {
  const showAccountAutocomplete = /@[\w][^\s]*$/.test(value);
  State.update({ text: value, showAccountAutocomplete });
}

function autoCompleteAccountId(id) {
  let text = state.text.replace(/[\s]{0,1}@[^\s]*$/, "");
  text = `${text} @${id}`.trim() + " ";
  State.update({ text, showAccountAutocomplete: false });
}

// const TextArea = styled.textarea`
//   background-color: #ffffff;
//   border: 1px solid #ECEEF0;
//   border-radius: 8px;
//   resize: none;
//   padding-left: 5.5rem;
//   padding-top: .75rem;
// `;
const AvatarWrapper = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
`;

const Wrapper = styled.div`
  --padding: 12px;
  --paddingLeft: ${withProfileImage ? "5.5rem" : "12px"};
  position: relative;
  margin-left: -12px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 200ms;
  border: 1px solid #eceef0;
  border-radius: 8px;

  &:focus-within {
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);
    border-color: #687076;
  }
`;

const Textarea = styled.div`
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
    min-height: 124px;
    font: inherit;
    padding: var(--padding) var(--padding) calc(40px + (var(--padding) * 2))
      var(--paddingLeft);
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
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }
`;

const Actions = styled.div`
  display: inline-flex;
  gap: 12px;
  position: absolute;
  bottom: var(--padding);
  right: var(--padding);

  .commit-post-button {
    background: #59e692;
    color: #11181c;
    border-radius: 40px;
    height: 40px;
    padding: 0 35px;
    font-weight: 600;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &:hover,
    &:focus {
      background: rgb(112 242 164);
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .upload-image-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f3f5;
    color: #11181c;
    border-radius: 40px;
    height: 40px;
    min-width: 40px;
    font-size: 0;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &::before {
      font-size: 16px;
    }

    &:hover,
    &:focus {
      background: #d7dbde;
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    span {
      margin-left: 12px;
    }
  }

  .d-inline-block {
    display: flex !important;
    gap: 12px;
    margin: 0 !important;

    .overflow-hidden {
      width: 40px !important;
      height: 40px !important;
    }
  }
`;

const AutoComplete = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  right: 0;

  > div > div {
    padding: calc(var(--padding) / 2);
  }
`;

// <div>
//   <div className="py-2 position-relative">
//     <AvatarWrapper>
//       <Widget
//         src="mob.near/widget/ProfileImage"
//         props={{
//           accountId,
//           imageClassName: "rounded-circle w-100 h-100",
//           imageStyle: {
//             pointerEvents: "none",
//             objectFit: "cover",
//           },
//         }}
//       />
//     </AvatarWrapper>
//     <TextArea
//       className="form-control"
//       style={{ "min-height": "15vh" }}
//       value={state.text || ""}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={props.placeholder ?? "What's happening?"}
//     />
//   </div>
//   <div className="d-flex flex-row py-2">
//     <div className="flex-grow-1">
//       <IpfsImageUpload
//         image={state.image}
//         className="btn btn-outline-secondary"
//         style={{
//           backgroundColor: "#FAFAFA",
//           color: "#006ADC",
//           fontWeight: 600,
//           borderRadius: "50px",
//           border: "1px solid #E6E8EB",
//           padding: ".5rem 1.75rem",
//         }}
//       />
//     </div>
//     <div>{props.composeButton && props.composeButton(onCompose)}</div>
//   </div>
// </div>

return (
  <Wrapper>
    {withProfileImage && (
      <AvatarWrapper>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            imageClassName: "rounded-circle w-100 h-100",
            imageStyle: {
              pointerEvents: "none",
              objectFit: "cover",
            },
          }}
        />
      </AvatarWrapper>
    )}
    <Textarea data-value={state.text}>
      <textarea
        placeholder="Write your reply..."
        onInput={(event) => textareaInputHandler(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            State.update({ showAccountAutocomplete: false });
          }
        }}
        value={state.text}
      />
    </Textarea>

    {autocompleteEnabled && state.showAccountAutocomplete && (
      <AutoComplete>
        <Widget
          src="adminalpha.near/widget/AccountAutocomplete"
          props={{
            term: state.text.split("@").pop(),
            onSelect: autoCompleteAccountId,
            onClose: () => State.update({ showAccountAutocomplete: false }),
          }}
        />
      </AutoComplete>
    )}

    <Actions>
      <IpfsImageUpload
        image={state.image}
        className="upload-image-button bi bi-image"
      />
      {composeButton && composeButton(onCompose)}
    </Actions>
  </Wrapper>
);
